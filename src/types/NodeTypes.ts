import { Node } from "@xyflow/react"
import { string } from "zod"


export enum TaskType{
    LAUNCH_BROWSER = "LAUNCH_BROWSER",
    PAGE_TO_HTML = "PAGE_TO_HTML",
    EXTRACT_TEXT_FROM_ELEMENT="EXTRACT_TEXT_FROM_ELEMENT"
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
    STRING = "string",
    BROWSER_TO_INSTANCE = "BROWSER_TO_INSTANCE",
    
}

export interface InputType {
    name:string,
    type:TaskParamType,
    helperText?:string,
    require:boolean,
    hideHandle?:boolean,
    [key:string]:any

}

export interface OutputType {
    name:string,
    type:TaskParamType
}