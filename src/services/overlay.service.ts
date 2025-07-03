import { $ } from "@/lib/selector";

export const overlay = {
    show: () => {
        const spinnerOverlay = $("#spinner-overlay");
        spinnerOverlay.classList.remove("hidden");
        spinnerOverlay.classList.add("flex");
    },
    hide: () => {
        const spinnerOverlay = $("#spinner-overlay");
        spinnerOverlay.classList.remove("flex");
        spinnerOverlay.classList.add("hidden");
    }
}