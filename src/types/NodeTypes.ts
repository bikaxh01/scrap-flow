import { Node } from "@xyflow/react"
export enum TaskType{
    LAUNCH_BROWSER = "LAUNCH_BROWSER"
}

export interface AppNodeData {
    type:TaskType,
    inputs:Record<string,string>,
    [key:string]:any
}

export interface AppNode extends Node {
    data:AppNodeData
}

export enum TaskParamType {
    STRING = "string"
}

export interface InputType {
    name:string,
    type:TaskParamType,
    helperText?:string,
    require:boolean,
    hideHandle?:boolean,
    [key:string]:any

}