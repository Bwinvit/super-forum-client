import React, { FC, useEffect, useState } from "react"
import Category from "../models/Category"
import { useAppSelector } from "../store/hooks";
import DropDown, { Option } from "react-dropdown";
import { useNavigate } from "react-router-dom";
import "react-dropdown/style.css";

const defaultLabel = "Select a category"
const defaultOption = {
      value: "0",
      label: defaultLabel
}

class CategoryDropDownProps {
      sendOutSelectedCategory?: (cat: Category) => void;
      navigate?: boolean = false
      preselectedCategory?: Category
}

const CategoryDropDown: FC<CategoryDropDownProps> = ({
      sendOutSelectedCategory,
      navigate,
      preselectedCategory
}) => {
      const categories = useAppSelector((state) => state.category)
      const [ categoryOptions, setCategoryOptions ] = useState<Array<string | Option>>([defaultLabel])
      const [ selectedOption, setSelectedOption ] = useState<Option>(defaultOption);
      const navigateLink = useNavigate()

      useEffect(() => {
            if (categories) {
                  const catOptions: Array<Option> = categories.payload.map((cat: Category) => {
                        return {
                              value: cat.id,
                              label: cat.name
                        }
                  })
                  setCategoryOptions(catOptions)
                  setSelectedOption({
                        value: preselectedCategory ? preselectedCategory.id : "0",
                        label: preselectedCategory ? preselectedCategory.name : defaultLabel
                  })
            }
      }, [categories, preselectedCategory])

      const onChangeDropDown = ( selected: Option ) => {
            setSelectedOption(selected)
            if (sendOutSelectedCategory) {
                  sendOutSelectedCategory(
                        new Category(selected.value, selected.label?.valueOf().toString() ?? "")
                  )
            }

            if (navigate) {
                  navigateLink(`/categorythreads/${selected.value}`)
            }
      }

      return (
            <DropDown
                  className="thread-category-dropdown"
                  options={categoryOptions}
                  onChange={onChangeDropDown}
                  value={selectedOption}
                  placeholder={defaultLabel}
            />
      )
}

export default CategoryDropDown