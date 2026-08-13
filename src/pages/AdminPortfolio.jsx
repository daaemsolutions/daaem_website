import React, { useState } from "react";
import { base44 } from "@/api/base44Client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Edit2, Trash2 } from "lucide-react";

const SERVICE_TYPES = [
  { value: "merchandising", label: "Merchandising" },
  { value: "brand_activation", label: "Brand Activation" },
  { value: "operation_auditing", label: "Operation Auditing" },
  { value: "events_management", label: "Events Management" },
];

export default function AdminPortfolio() {
  const queryClient = useQueryClient();
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    titleAr: "",
    description: "",
    descriptionAr: "",
    serviceType: "merchandising",
    client: "",
    year: new Date().getFullYear(),
    location: "",
    featuredImage: "",
    images: "",
    details: "",
    detailsAr: "",
    published: true,
  });

  const { data: projects } = useQuery({
    queryKey: ["portfolio"],
    queryFn: () => base44.entities.Portfolio.list("-created_date", 100),
    initialData: [],
  });

  const createMutation = useMutation({
    mutationFn: (data) => {
      const images = data.images
        .split("\n")
        .map((img) => img.trim())
        .filter((img) => img);
      return base44.entities.Portfolio.create({ ...data, images });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["portfolio"] });
      resetForm();
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }) => {
      const images = data.images
        .split("\n")
        .map((img) => img.trim())
        .filter((img) => img);
      return base44.entities.Portfolio.update(id, { ...data, images });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["portfolio"] });
      resetForm();
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => base44.entities.Portfolio.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["portfolio"] });
    },
  });

  const resetForm = () => {
    setShowForm(false);
    setEditingId(null);
    setFormData({
      title: "",
      titleAr: "",
      description: "",
      descriptionAr: "",
      serviceType: "merchandising",
      client: "",
      year: new Date().getFullYear(),
      location: "",
      featuredImage: "",
      images: "",
      details: "",
      detailsAr: "",
      published: true,
    });
  };

  const handleEdit = (project) => {
    setEditingId(project.id);
    setFormData({
      ...project,
      images: (project.images || []).join("\n"),
    });
    setShowForm(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingId) {
      updateMutation.mutate({ id: editingId, data: formData });
    } else {
      createMutation.mutate(formData);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-[#3a3a3a]">إدارة المشاريع</h1>
          <Button
            onClick={() => setShowForm(!showForm)}
            className="bg-[#23AA9E] hover:bg-[#1d9389]"
          >
            <Plus className="w-4 h-4 mr-2" />
            مشروع جديد
          </Button>
        </div>

        {showForm && (
          <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg mb-8 shadow-lg">
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <Input
                placeholder="العنوان بالإنجليزية"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
              />
              <Input
                placeholder="العنوان بالعربية"
                value={formData.titleAr}
                onChange={(e) => setFormData({ ...formData, titleAr: e.target.value })}
                required
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <Textarea
                placeholder="الوصف بالإنجليزية"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
              <Textarea
                placeholder="الوصف بالعربية"
                value={formData.descriptionAr}
                onChange={(e) => setFormData({ ...formData, descriptionAr: e.target.value })}
              />
            </div>

            <div className="grid md:grid-cols-3 gap-4 mb-4">
              <select
                value={formData.serviceType}
                onChange={(e) => setFormData({ ...formData, serviceType: e.target.value })}
                className="border rounded p-2"
              >
                {SERVICE_TYPES.map((type) => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
              <Input
                placeholder="اسم العميل"
                value={formData.client}
                onChange={(e) => setFormData({ ...formData, client: e.target.value })}
              />
              <Input
                placeholder="السنة"
                type="number"
                value={formData.year}
                onChange={(e) => setFormData({ ...formData, year: parseInt(e.target.value) })}
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <Input
                placeholder="رابط الصورة الرئيسية"
                value={formData.featuredImage}
                onChange={(e) => setFormData({ ...formData, featuredImage: e.target.value })}
                required
              />
              <Input
                placeholder="الموقع"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              />
            </div>

            <div className="mb-4">
              <label className="text-sm font-semibold mb-2 block">روابط الصور الإضافية (رابط واحد في كل سطر)</label>
              <Textarea
                placeholder="https://example.com/image1.jpg&#10;https://example.com/image2.jpg"
                value={formData.images}
                onChange={(e) => setFormData({ ...formData, images: e.target.value })}
                className="h-20"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <Textarea
                placeholder="التفاصيل بالإنجليزية"
                value={formData.details}
                onChange={(e) => setFormData({ ...formData, details: e.target.value })}
              />
              <Textarea
                placeholder="التفاصيل بالعربية"
                value={formData.detailsAr}
                onChange={(e) => setFormData({ ...formData, detailsAr: e.target.value })}
              />
            </div>

            <div className="flex gap-2">
              <Button type="submit" className="bg-[#23AA9E] hover:bg-[#1d9389]">
                {editingId ? "تحديث" : "إضافة"}
              </Button>
              <Button type="button" variant="outline" onClick={resetForm}>
                إلغاء
              </Button>
            </div>
          </form>
        )}

        <div className="grid gap-4">
          {projects.map((project) => (
            <div key={project.id} className="bg-white p-4 rounded-lg shadow flex justify-between items-start">
              <div>
                <h3 className="font-bold text-lg">{project.titleAr}</h3>
                <p className="text-sm text-gray-600">{project.client} • {project.year}</p>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleEdit(project)}
                >
                  <Edit2 className="w-4 h-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => deleteMutation.mutate(project.id)}
                  className="text-red-600"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}