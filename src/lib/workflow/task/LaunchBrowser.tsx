import { TaskParamType, TaskType } from "@/types/NodeTypes";
import { Globe, LucideProps } from "lucide-react";

export const LaunchBrowserTask = {
  type: TaskType.LAUNCH_BROWSER,
  label: "Launch browser",
  icon: (props: LucideProps) => (
    <Globe className=" stroke-pink-400" {...props} />
  ),
  isEntryPoint: true,
  inputs:[
    {
      name:'Website Url',
      type:TaskParamType.STRING,
      helperText:"eg: https://google.com",
      require:true,
      hideHandle:true
    }
  ],
  outputs:[{
    name:"web page",type:TaskParamType.BROWSER_TO_INSTANCE
  }]
};
