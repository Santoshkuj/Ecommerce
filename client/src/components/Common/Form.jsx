import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {Select,SelectContent,SelectItem,SelectTrigger,SelectValue,} from "../ui/select";
import { Textarea } from "../ui/textarea";

function CommonForm({formControls,formData,setFormData,onSubmit,buttonText,isBtnDisabled}) {

    function inputType(controlElement) {
        let element = null;
        const value = formData[controlElement.name] || ''

    switch (controlElement.componentType) {
      case "input":
        element = (
          <Input
            name={controlElement.name}
            placeholder={controlElement.placeholder}
            id={controlElement.name}
            type={controlElement.type}
            value={value}
            onChange={(event)=>setFormData({
                ...formData,
                [controlElement.name] : event.target.value
            })}
          />
        );
        break;
      case "select":
        element = (<Select value={value} onValueChange={(value)=>
            setFormData({
                ...formData,
                [controlElement.name] : value
            })
        }>
          <SelectTrigger className="w-full">
            <SelectValue placeholder={controlElement.label} />
          </SelectTrigger> 
            <SelectContent>
              {controlElement.options && controlElement.options.length > 0
                ? controlElement.options.map((option) => (
                    <SelectItem key={option.id} value={option.id}>
                      {option.label}
                    </SelectItem>
                  ))
                : null}
            </SelectContent>
        </Select>)
        break;
      case "textarea":
        element = (
          <Textarea
            name={controlElement.name}
            placeholder={controlElement.placeholder}
            value={value}
            onChange={(event)=>setFormData({
                ...formData,
                [controlElement.name] : event.target.value
            })}
          />
        );
        break;

      default:
        element = (
          <Input
            name={controlElement.name}
            placeholder={controlElement.placeholder}
            id={controlElement.name}
            type={controlElement.type}
            value={value}
            onChange={(event)=>setFormData({
                ...formData,
                [controlElement.name] : event.targe.value
            })}
          />
        );
        break;
    }
    return element;
  }
  return (
    <form onSubmit={onSubmit}>
      <div className="flex flex-col gap-3">
        {formControls.map((item) => (
          <div className="grid w-full gap-1.5" key={item.name}>
            <Label className="mb-1">{item.label}</Label>
            {inputType(item)}
          </div>
        ))}
      </div>
      <Button className="mt-2 w-full" type="submit" disabled={isBtnDisabled}>
        {buttonText || "Submit"}
      </Button>
    </form>
  );
};
export default CommonForm;
