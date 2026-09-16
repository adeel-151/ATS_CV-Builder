import { useFormContext, useFieldArray } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export function SkillsForm() {
  const { register, control } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "skills"
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
            <div className="space-y-2 md:col-span-2">
              <Label>Skill Description (e.g. JavaScript, Public Speaking)</Label>
              <Input {...register(`skills.${index}.description`)} />
            </div>
            <div className="space-y-2">
              <Label>Category (Optional)</Label>
              <Input {...register(`skills.${index}.category`)} placeholder="e.g. Technical, Soft Skill" />
            </div>
            <div className="space-y-2">
              <Label>Proficiency</Label>
              <Input {...register(`skills.${index}.proficiency`)} placeholder="e.g. Expert, Beginner" />
            </div>
          </div>
        </div>
      ))}
      <Button 
        type="button" 
        variant="outline" 
        onClick={() => append({ description: "", category: "", proficiency: "" })}
      >
        + Add Skill
      </Button>
    </div>
  );
}
