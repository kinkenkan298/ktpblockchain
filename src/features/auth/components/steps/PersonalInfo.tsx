import { withForm } from "@/hooks/form";
import { StepFormData } from "../../types/auth-schema";

export const PersonalInfoFields = withForm({
  defaultValues: {} as Partial<StepFormData>,
  render: ({ form }) => {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="md:col-span-2">
          <form.AppField
            name="nik"
            children={(field) => (
              <field.TextField
                label="NIK (Nomor Induk Kependudukan)"
                placeholder="16 digit angka NIK"
                maxLength={16}
                type="number"
              />
            )}
          />
        </div>
        <div className="md:col-span-2">
          <form.AppField
            name="nama_lengkap"
            children={(field) => (
              <field.TextField
                label="Nama Lengkap"
                placeholder="Nama Lengkap sesuai KTP"
              />
            )}
          />
        </div>
        <div>
          <form.AppField
            name="tempat_lahir"
            children={(field) => (
              <field.TextField
                label="Tempat Lahir"
                placeholder="Kota Tempat Lahir"
              />
            )}
          />
        </div>
        <div>
          <form.AppField
            name="tanggal_lahir"
            children={(field) => (
              <field.DatePickerField label="Tanggal Lahir" />
            )}
          />
        </div>
        <div className="md:col-span-2">
          <form.AppField
            name="jenis_kelamin"
            children={(field) => (
              <field.SelectField
                label="Jenis Kelamin"
                data={[
                  {
                    label: "Laki Laki",
                    value: "male",
                  },
                  {
                    label: "Perempuan",
                    value: "female",
                  },
                ]}
                selectLabel="Pilih Jenis Kelamin"
              />
            )}
          />
        </div>
        <div className="md:col-span-2">
          <form.AppField
            name="alamat"
            children={(field) => (
              <field.TextareaField
                label="Alamat"
                placeholder="Jl. Nama Jalan No. 123"
              />
            )}
          />
        </div>
        <div>
          <form.AppField
            name="rt_rw"
            children={(field) => (
              <field.TextField label="RT/RW" placeholder="001/002" />
            )}
          />
        </div>
        <div>
          <form.AppField
            name="kelurahan"
            children={(field) => (
              <field.TextField label="Kelurahan" placeholder="Nama Kelurahan" />
            )}
          />
        </div>
        <div>
          <form.AppField
            name="kecamatan"
            children={(field) => (
              <field.TextField label="Kecamatan" placeholder="Nama Kecamatan" />
            )}
          />
        </div>
        <div>
          <form.AppField
            name="kota"
            children={(field) => (
              <field.TextField label="Kota" placeholder="Nama Kota" />
            )}
          />
        </div>
        <div>
          <form.AppField
            name="provinsi"
            children={(field) => (
              <field.TextField label="Provinsi" placeholder="Nama Provinsi" />
            )}
          />
        </div>
        <div>
          <form.AppField
            name="kode_pos"
            children={(field) => (
              <field.TextField
                label="Kode Pos"
                placeholder="Kode Pos"
                type="number"
              />
            )}
          />
        </div>
        <div className="md:col-span-2">
          <form.AppField
            name="phone"
            children={(field) => (
              <field.TextField
                label="No Telp"
                placeholder="+6285112331234"
                maxLength={12}
                type="tel"
              />
            )}
          />
        </div>
      </div>
    );
  },
});
