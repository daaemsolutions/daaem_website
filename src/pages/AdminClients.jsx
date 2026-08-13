import React, { useState } from "react";
import { base44 } from "@/api/base44Client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Edit2, Trash2 } from "lucide-react";

export default function AdminClients() {
  const queryClient = useQueryClient();
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    logo: "",
    category: "",
    order: 0,
    published: true,
  });

  const { data: clients } = useQuery({
    queryKey: ["clients"],
    queryFn: () => base44.entities.Client.list("order", 100),
    initialData: [],
  });

  const createMutation = useMutation({
    mutationFn: (data) => base44.entities.Client.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["clients"] });
      resetForm();
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }) => base44.entities.Client.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["clients"] });
      resetForm();
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => base44.entities.Client.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["clients"] });
    },
  });

  const resetForm = () => {
    setShowForm(false);
    setEditingId(null);
    setFormData({
      name: "",
      logo: "",
      category: "",
      order: 0,
      published: true,
    });
  };

  const handleEdit = (client) => {
    setEditingId(client.id);
    setFormData(client);
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
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-[#3a3a3a]">إدارة العملاء</h1>
          <Button
            onClick={() => setShowForm(!showForm)}
            className="bg-[#23AA9E] hover:bg-[#1d9389]"
          >
            <Plus className="w-4 h-4 mr-2" />
            عميل جديد
          </Button>
        </div>

        {showForm && (
          <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg mb-8 shadow-lg">
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <Input
                placeholder="اسم الشركة"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
              <Input
                placeholder="الفئة"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <Input
                placeholder="رابط الشعار"
                value={formData.logo}
                onChange={(e) => setFormData({ ...formData, logo: e.target.value })}
                required
              />
              <Input
                placeholder="ترتيب العرض"
                type="number"
                value={formData.order}
                onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) })}
              />
            </div>

            <div className="mb-4 flex items-center gap-2">
              <input
                type="checkbox"
                id="published"
                checked={formData.published}
                onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
              />
              <label htmlFor="published" className="text-sm font-semibold">
                معروض
              </label>
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
          {clients.map((client) => (
            <div key={client.id} className="bg-white p-4 rounded-lg shadow flex justify-between items-center">
              <div className="flex items-center gap-4">
                <img
                  src={client.logo}
                  alt={client.name}
                  className="w-16 h-16 object-contain"
                  onError={(e) => (e.target.src = "https://via.placeholder.com/100")}
                />
                <div>
                  <h3 className="font-bold text-lg">{client.name}</h3>
                  <p className="text-sm text-gray-600">{client.category}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleEdit(client)}
                >
                  <Edit2 className="w-4 h-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => deleteMutation.mutate(client.id)}
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