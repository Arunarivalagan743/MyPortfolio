import * as React from "react"

import type {
  ToastActionElement,
  ToastProps,
} from "@/components/ui/toast"

const TOAST_LIMIT = 1
const TOAST_REMOVE_DELAY = 1000000

type ToasterToast = ToastProps & {
  id: string
  title?: React.ReactNode
  description?: React.ReactNode
  action?: ToastActionElement
  animation?: "flip" | "zoom" | "bounce" | "slide" | "none"
  sweetStyle?: boolean
  icon?: React.ReactNode
  variant?: "default" | "success" | "error" | "warning" | "info"
}

// Helper to generate unique IDs for toasts
let toastId = 0;
function genId() {
  return `toast-${++toastId}`;
}

// Simple event dispatcher for demonstration (replace with your state management)
const listeners: Function[] = [];
function dispatch(action: any) {
  listeners.forEach(listener => listener(action));
}

// Hook to subscribe to toast events (replace with your implementation)
function useToast() {
  const [toasts, setToasts] = React.useState<ToasterToast[]>([]);

  React.useEffect(() => {
    function handleAction(action: any) {
      switch (action.type) {
        case "ADD_TOAST":
          setToasts((prev) => [action.toast, ...prev].slice(0, TOAST_LIMIT));
          break;
        case "UPDATE_TOAST":
          setToasts((prev) =>
            prev.map((toast) =>
              toast.id === action.toast.id ? { ...toast, ...action.toast } : toast
            )
          );
          break;
        case "DISMISS_TOAST":
          setToasts((prev) =>
            prev.filter((toast) => toast.id !== action.toastId)
          );
          break;
        default:
          break;
      }
    }
    listeners.push(handleAction);
    return () => {
      const idx = listeners.indexOf(handleAction);
      if (idx > -1) listeners.splice(idx, 1);
    };
  }, []);

  return { toasts };
}

type Toast = Omit<ToasterToast, "id">

function toast({ 
  animation = "flip", 
  sweetStyle = false, 
  variant = "default",
  ...props 
}: Toast) {
  const id = genId()

  const update = (props: ToasterToast) =>
    dispatch({
      type: "UPDATE_TOAST",
      toast: { ...props, id },
    })
  const dismiss = () => dispatch({ type: "DISMISS_TOAST", toastId: id })

  dispatch({
    type: "ADD_TOAST",
    toast: {
      ...props,
      id,
      open: true,
      animation,
      sweetStyle,
      variant,
      onOpenChange: (open) => {
        if (!open) dismiss()
      },
    },
  })

  return {
    id: id,
    dismiss,
    update,
  }
}

export { useToast, toast }
