import { TaskParamType, TaskType } from "@/types/NodeTypes";
import { CodeIcon, Globe, LucideProps } from "lucide-react";

export const PageToHtmlTask = {
  type: TaskType.PAGE_TO_HTML,
  label: "Get HTML ",
  icon: (props: LucideProps) => (
    <CodeIcon className=" stroke-pink-400" {...props} />
  ),
  isEntryPoint: false,
  inputs: [
    {
      name: "Page to html",
      type: TaskParamType.BROWSER_TO_INSTANCE,
      helperText: "eg: https://google.com",
      require: true,
    },
  ],
  outputs:[{
    name:'Html',type:TaskParamType.STRING
  },{
    name:'web page', type:TaskParamType.BROWSER_TO_INSTANCE
  }
]
};
