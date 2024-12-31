"use client";
import React, { useState } from "react";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { DeleteIcon, EclipseIcon, EllipsisVertical, Trash } from "lucide-react";
import { cn } from "@/lib/utils";
import { useMutation } from "@tanstack/react-query";
import { deleteWorkflow } from "../../../../../../actions/workflows/Workflows";
import { toast } from "sonner";



function WorkflowActions({ workflowId }: { workflowId: string }) {
  const [deleteAlert, setDeleteAlert] = useState(false);
  return (
    <>
      <DeleteAlertDialog
        workflowId={workflowId}
        open={deleteAlert}
        setOpen={setDeleteAlert}
      />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">
            <EllipsisVertical />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup onClick={() => setDeleteAlert((prev) => !prev)}>
            <DropdownMenuItem>
              Delete
              <DropdownMenuShortcut>
                <Trash size={18} />
              </DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}

function DeleteAlertDialog({
  open,
  setOpen,
  workflowId,
}: {
  workflowId: string;
  open: boolean;
  setOpen: any;
}) {
  const { mutate, isPending } = useMutation({
    mutationFn: deleteWorkflow,
    onSuccess: () => {
      toast.success("Workflow deleted", { id: workflowId });
    },
    onError: () => {
      toast.error("something went wrong", { id: workflowId });
    },
  });
  const handleDelete = () => {
    toast.loading("Deleting...", { id: workflowId });
    mutate(workflowId);
  };
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            workflow and you can't access it later.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            className={cn(
              buttonVariants({
                variant: "destructive",
              })
            )}
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default WorkflowActions;
