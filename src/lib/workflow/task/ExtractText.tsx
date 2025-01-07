import { TaskParamType, TaskType } from "@/types/NodeTypes";
import { Globe, LucideProps, Text } from "lucide-react";

export const ExtractTextTask = {
  type: TaskType.EXTRACT_TEXT_FROM_ELEMENT,
  label: "Extract text from element",
  icon: (props: LucideProps) => (
    <Text className=" stroke-pink-400" {...props} />
  ),
  isEntryPoint: false,
  inputs: [
    {
      name: "Html",
      type: TaskParamType.STRING,
      helperText: "eg: https://google.com",
      require: true,
    },
    {
      name: "Selector",
      type: TaskParamType.STRING,
      helperText: "eg: https://google.com",
      require: true,
    },
  ],
  outputs: [
    {
      name: "Extracted Text",
      type: TaskParamType.BROWSER_TO_INSTANCE,
    },
  ],
};
