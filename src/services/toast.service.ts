import { $ } from "@/lib/selector";


export const toast = {
    show: (message: string) => {
        const toastMessage = $("#toast-message") as HTMLDivElement;
        const t = $("#toast-default") as HTMLDivElement;
        toastMessage.textContent = message;
        t.classList.remove("opacity-0");
        // toast.classList.remove("absolute");
        t.classList.remove("-z-50");
        // toast.classList.add("relative");
    },
    hide: () => {
        const t = $("#toast-default") as HTMLDivElement;
        // toast.classList.remove("relative");
        // toast.classList.add("absolute");
        t.classList.add("opacity-0");
        t.classList.add("-z-50");
    },
    showHide: (message: string, duration: number = 5000) => {
        toast.show(message);
        setTimeout(() => {
            toast.hide();
        }, duration);
    }
}
