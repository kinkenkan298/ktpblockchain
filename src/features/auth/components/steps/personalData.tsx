import { useForm } from "@tanstack/react-form";
import {
  type PersonalInfoData,
  PersonalInfoSchema,
} from "../../types/registerSchema";
import { Button } from "@/components/ui/button";
import {
  FieldError,
  FieldLabel,
  Field,
  FieldSet,
  FieldLegend,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { RadioGroup } from "@radix-ui/react-radio-group";
import { RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface PersonalDataStepsPros {
  defaultValues?: PersonalInfoData | null;
  onNext: (data: PersonalInfoData) => void;
  onBack: () => void;
}

const defaultData: PersonalInfoData = {
  nik: "",
  nama_lengkap: "",
  tempat_lahir: "",
  tanggal_lahir: "",
  jenis_kelamin: "male",
  alamat: "",
  rt_rw: "",
  kelurahan: "",
  kecamatan: "",
  kota: "",
  provinsi: "",
  kode_pos: "",
};

export function PersonalDataSteps({
  defaultValues,
  onNext,
  onBack,
}: PersonalDataStepsPros) {
  const form = useForm({
    defaultValues: defaultValues || defaultData,
    validators: {
      onSubmit: PersonalInfoSchema,
    },
    onSubmit: ({ value }) => {
      onNext(value);
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
    >
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">Data Pribadi</h3>
        <p className="text-sm text-gray-600 mb-6">
          Masukkan data sesuai dengan KTP Anda. Pastikan data valid untuk proses
          verifikasi.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <form.Field
              name="nik"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>
                      NIK (Nomor Induk Kependudukan)
                    </FieldLabel>
                    <Input
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      aria-invalid={isInvalid}
                      placeholder="16 digit angka NIK"
                      autoComplete="off"
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            />
          </div>
          <div className="md:col-span-2">
            <form.Field
              name="nama_lengkap"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Nama Lengkap</FieldLabel>
                    <Input
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      aria-invalid={isInvalid}
                      placeholder="Nama Lengkap sesuai KTP"
                      autoComplete="off"
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            />
          </div>
          <div>
            <form.Field
              name="tempat_lahir"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Tempat Lahir</FieldLabel>
                    <Input
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      aria-invalid={isInvalid}
                      placeholder="Kota tempat lahir"
                      autoComplete="off"
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            />
          </div>
          <div>
            <form.Field
              name="tanggal_lahir"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;

                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Tanggal Lahir</FieldLabel>
                    <Input
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      aria-invalid={isInvalid}
                      autoComplete="off"
                      type="date"
                    />

                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            />
          </div>
          <div className="md:col-span-2">
            <form.Field
              name="jenis_kelamin"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <FieldSet>
                    <FieldLabel>Jenis Kelamin</FieldLabel>
                    <RadioGroup
                      value={field.state.value}
                      onValueChange={() => field.handleChange}
                      name={field.name}
                      id={field.name}
                      aria-invalid={isInvalid}
                    >
                      <Field orientation="horizontal" data-invalid={isInvalid}>
                        <RadioGroupItem
                          value="male"
                          id="jk-laki"
                          aria-invalid={isInvalid}
                        />
                        <FieldLabel htmlFor="jk-laki" className="font-normal">
                          Laki Laki
                        </FieldLabel>
                      </Field>
                      <Field orientation="horizontal" data-invalid={isInvalid}>
                        <RadioGroupItem
                          value="female"
                          id="jk-perempuan"
                          aria-invalid={isInvalid}
                        />
                        <FieldLabel
                          htmlFor="jk-perempuan"
                          className="font-normal"
                        >
                          Perempuan
                        </FieldLabel>
                      </Field>
                    </RadioGroup>
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </FieldSet>
                );
              }}
            />
          </div>
          <div className="md:col-span-2">
            <form.Field
              name="alamat"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Alamat</FieldLabel>
                    <Textarea
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      aria-invalid={isInvalid}
                      placeholder="Jl. Nama Jalan No. 123"
                      autoComplete="off"
                      rows={3}
                    />
                  </Field>
                );
              }}
            />
          </div>
          <div>
            <form.Field
              name="rt_rw"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>RT/RW</FieldLabel>
                    <Input
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      aria-invalid={isInvalid}
                      placeholder="001/002"
                      autoComplete="off"
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            />
          </div>
          <div>
            <form.Field
              name="kelurahan"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Kelurahan/Desa</FieldLabel>
                    <Input
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      aria-invalid={isInvalid}
                      placeholder="Nama kelurahan"
                      autoComplete="off"
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            />
          </div>
          <div>
            <form.Field
              name="kecamatan"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Kecamatan</FieldLabel>
                    <Input
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      aria-invalid={isInvalid}
                      placeholder="Nama kecamatan"
                      autoComplete="off"
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            />
          </div>
          <div>
            <form.Field
              name="kota"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Kota</FieldLabel>
                    <Input
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      aria-invalid={isInvalid}
                      placeholder="Nama kota"
                      autoComplete="off"
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            />
          </div>
          <div>
            <form.Field
              name="provinsi"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Provinsi</FieldLabel>
                    <Input
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      aria-invalid={isInvalid}
                      placeholder="Nama provinsi"
                      autoComplete="off"
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            />
          </div>
          <div>
            <form.Field
              name="kode_pos"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Kode pos</FieldLabel>
                    <Input
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      aria-invalid={isInvalid}
                      placeholder="12345"
                      autoComplete="off"
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            />
          </div>
        </div>
      </div>
      <div className="flex justify-between mt-5">
        <Button variant="outline" onClick={onBack}>
          Kembali
        </Button>
        <form.Subscribe
          selector={(state) => [state.isValid, state.isSubmitting]}
          children={([isValid, isSubmitting]) => (
            <Button
              type="submit"
              disabled={!isValid || isSubmitting}
              variant={isValid ? "default" : "destructive"}
            >
              Lanjut ke document
            </Button>
          )}
        />
      </div>
    </form>
  );
}
