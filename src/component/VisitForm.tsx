import { useFieldArray, useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";

interface Disease {
  name: string;
  description?: string;
}
interface Medication {
  name: string;
  dosage: string;
}
interface Patient {
  id: string;
  firstName: string;
  lastName: string;
  gender: "male" | "female";
  diseases: Disease[];
  medication: Medication[];
}

const VisitForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm<Patient>({
    defaultValues: {
      id: "",
      firstName: "",
      lastName: "",
      gender: "male",
      diseases: [{ name: "", description: "" }],
      medication: [{ name: "", dosage: "" }],
    },
  });

  const {
    fields: medicationFields,
    append: appendMedication,
    remove: removeMedication,
  } = useFieldArray({
    control,
    name: "medication",
  });

  const {
    fields: diseasesFields,
    append: appendDiseases,
    remove: removeDiseases,
  } = useFieldArray({
    control,
    name: "diseases",
  });

  const onSubmit = (data: Omit<Patient, "id">) => {
    const newData = { ...data, id: uuidv4() };
    console.log("form submitted", newData);
    reset();
  };

  return (
    <div className="flex justify-center align-center min-h-screen">
      <div className="container max-w-3/4 my-auto text-slate-600 border border-slate-600 rounded-xl px-6 py-10">
        <h2 className=" text-2xl text-center mb-8">فرم ویزیت</h2>
        <form
          className="grid gap-8 "
          onSubmit={handleSubmit(onSubmit)}
          noValidate
        >
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <label>نام:</label>
              <input
                {...register("firstName", {
                  required: "وارد کردن نام اجباری است",
                })}
                className="border rounded p-1 pr-2 mr-2"
                type="text"
              />
              {errors.firstName && (
                <p className="  text-red-500 text-xs">
                  {errors.firstName?.message}
                </p>
              )}
            </div>

            <div>
              <label>نام خانوادگی:</label>
              <input
                {...register("lastName", {
                  required: "وارد کردن نام خانوادگی اجباری است",
                })}
                className="border rounded p-1 pr-2 mr-2"
                type="text"
              />
              {errors.lastName && (
                <p className="  text-red-500 text-xs">
                  {errors.lastName.message}
                </p>
              )}
            </div>

            <div>
              <label>جنسیت:</label>
              <select
                {...register("gender", {
                  required: "وارد کردن جنسیت اجباری است",
                })}
                className="border rounded p-1 pr-2 mr-2 "
              >
                <option value="">انتخاب جنسیت</option>
                <option value="male">آقا</option>
                <option value="female">خانم</option>
              </select>
              {errors.gender && (
                <p className="  text-red-500 text-xs">
                  {errors.gender.message}
                </p>
              )}
            </div>
          </div>

          <div className="border border-dashed flex flex-col gap-6 py-4">
            {diseasesFields.map((field, index) => (
              <div key={field.id}>
                <div className="flex flex-wrap items-center justify-between p-2 border-b border-slate-600">
                  <div>
                    <label>نام بیماری</label>
                    <input
                      className="border rounded pr-2 mr-2"
                      type="text"
                      {...register(`diseases.${index}.name`, {
                        required: "نام بیماری الزامی است",
                      })}
                    />
                    {errors.diseases?.[index]?.name && (
                      <p className="text-xs text-red-500">
                        {errors.diseases?.[index].name.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label>توضیحات</label>
                    <input
                      className="border rounded pr-2 mr-2"
                      type="text"
                      {...register(`diseases.${index}.description`)}
                    />
                  </div>

                  <button
                    className="px-2 py-1 cursor-pointer bg-slate-600 text-white rounded-xl"
                    onClick={() => {
                      removeDiseases(index);
                    }}
                  >
                    حذف
                  </button>
                </div>
              </div>
            ))}
            <button
              type="button"
              className="w-[100px] py-2 mr-2 cursor-pointer border border-slate-600 rounded-xl"
              onClick={() => appendDiseases({ name: "", description: "" })}
            >
              افزودن بیماری
            </button>
          </div>
          <div className="border border-dashed flex flex-col gap-6 py-4">
            {medicationFields.map((field, index) => (
              <div key={field.id}>
                <div className="flex flex-wrap items-center justify-between p-2 border-b border-slate-600">
                  <div>
                    <label>نام دارو</label>
                    <input
                      className="border rounded pr-2 mr-2"
                      type="text"
                      {...register(`medication.${index}.name`, {
                        required: "نام دارو الزامی است",
                      })}
                    />
                    {errors.medication?.[index]?.name && (
                      <p className="text-xs text-red-500">
                        {errors.medication?.[index].name.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label>مقدار مصرف</label>
                    <input
                      className="border rounded pr-2 mr-2"
                      type="text"
                      {...register(`medication.${index}.dosage`, {
                        required: "مقدار مصرف الزامی است",
                      })}
                    />
                    {errors.medication?.[index]?.dosage && (
                      <p className="text-xs text-red-500">
                        {errors.medication?.[index].dosage.message}
                      </p>
                    )}
                  </div>

                  <button
                    className="px-2 py-1 cursor-pointer bg-slate-600 text-white rounded-xl"
                    onClick={() => {
                      removeMedication(index);
                    }}
                  >
                    حذف
                  </button>
                </div>
              </div>
            ))}
            <button
              type="button"
              className="w-[100px] py-2 mr-2 cursor-pointer border border-slate-600 rounded-xl"
              onClick={() => appendMedication({ name: "", dosage: "" })}
            >
              افزودن دارو
            </button>
          </div>

          <button
            className="px-4 py-2 border border-slate-600 rounded-xl"
            type="submit"
          >
            ثبت بیمار
          </button>
        </form>
      </div>
    </div>
  );
};
export default VisitForm;
