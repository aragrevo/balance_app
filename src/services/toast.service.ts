import { $ } from "@/lib/selector";


export const toast = {
    show: (message: string) => {
        const toastMessage = $("#toast-message") as HTMLDivElement;
        const toast = $("#toast-default") as HTMLDivElement;
        toastMessage.textContent = message;
        toast.classList.remove("opacity-0");
        toast.classList.remove("absolute");
        toast.classList.remove("-z-50");
        toast.classList.add("relative");
    },
    hide: () => {
        const toast = $("#toast-default") as HTMLDivElement;
        toast.classList.remove("relative");
        toast.classList.add("absolute");
        toast.classList.add("opacity-0");
        toast.classList.add("-z-50");
    }
}
