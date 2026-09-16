import { useFormContext, useFieldArray } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export function EducationForm() {
  const { register, control } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "education"
  });

  return (
    <div className="space-y-6">
      {fields.map((item, index) => (
        <div key={item.id} className="p-4 border rounded-md relative space-y-4">
          <Button 
            type="button" 
            variant="destructive" 
            size="sm" 
            className="absolute top-2 right-2"
            onClick={() => remove(index)}
          >
            Remove
          </Button>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Degree / Qualification</Label>
              <Input {...register(`education.${index}.degree`)} />
            </div>
            <div className="space-y-2">
              <Label>Institution</Label>
              <Input {...register(`education.${index}.institution`)} />
            </div>
            <div className="space-y-2">
              <Label>Start Date</Label>
              <Input type="date" {...register(`education.${index}.start_date`)} />
            </div>
            <div className="space-y-2">
              <Label>End Date</Label>
              <Input type="date" {...register(`education.${index}.end_date`)} />
            </div>
          </div>
        </div>
      ))}
      <Button 
        type="button" 
        variant="outline" 
        onClick={() => append({ degree: "", institution: "", start_date: "", end_date: "" })}
      >
        + Add Education
      </Button>
    </div>
  );
}
