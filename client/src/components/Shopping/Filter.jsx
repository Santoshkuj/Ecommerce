import { filterOptions } from "@/Config/Config";
import { Label } from "../ui/label";
import { Checkbox } from "../ui/checkbox";
import { Fragment } from "react";

const ProductFilter = ({ filters, handleFilter }) => {
  return (
    <div className="bg-background rounded-lg shadow-sm">
      <div className="p-4 border-b">
        <h2 className="text-lg font-semibold">Filter</h2>
      </div>
      <div className="p-4 space-y-4">
        {Object.keys(filterOptions).map((item, i) => (
          <Fragment key={i}>
            <div>
              <h3 className="text-base font-bold">{item}</h3>
              <div className="grid gap-2 mt-2">
                {filterOptions[item].map((option) => (
                  <Label
                    key={option.id}
                    className="flex items-center gap-2 font-normal">
                    <Checkbox
                      checked={filters && Object.keys(item).length > 0
                        && filters[item] && filters[item].indexOf(option.id) > -1
                      }
                      onCheckedChange={() => handleFilter(item, option.id)}/>
                    {option.label}
                  </Label>
                ))}
              </div>
            </div>
          </Fragment>
        ))}
      </div>
    </div>
  );
};
export default ProductFilter;
