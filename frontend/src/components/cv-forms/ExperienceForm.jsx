import { useFormContext, useFieldArray } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export function ExperienceForm() {
  const { register, control } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "work_experience"
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
              <Label>Job Title</Label>
              <Input {...register(`work_experience.${index}.job_title`)} />
            </div>
            <div className="space-y-2">
              <Label>Employer</Label>
              <Input {...register(`work_experience.${index}.employer`)} />
            </div>
            <div className="space-y-2">
              <Label>Start Date</Label>
              <Input type="date" {...register(`work_experience.${index}.start_date`)} />
            </div>
            <div className="space-y-2">
              <Label>End Date</Label>
              <Input type="date" {...register(`work_experience.${index}.end_date`)} />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label>Activities / Responsibilities</Label>
              <textarea 
                className="flex min-h-[80px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                {...register(`work_experience.${index}.activities`)} 
              />
            </div>
          </div>
        </div>
      ))}
      <Button 
        type="button" 
        variant="outline" 
        onClick={() => append({ job_title: "", employer: "", start_date: "", end_date: "", activities: "" })}
      >
        + Add Work Experience
      </Button>
    </div>
  );
}
