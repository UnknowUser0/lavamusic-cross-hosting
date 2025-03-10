import {ColorANSI} from "./ColorANSI";

export async function formatUptime(seconds: number) {
    const days = Math.floor(seconds / 86400);
    const hours = Math.floor((seconds % 86400) / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    if (seconds == -1) {
        return `${ColorANSI.RED}Offline`
    } else if (seconds < 60) {
        return `${ColorANSI.BRIGHT_CYAN}${secs}${ColorANSI.BRIGHT_GREEN} s${ColorANSI.RESET}`;
    } else if (seconds < 3600) {
        return `${ColorANSI.BRIGHT_CYAN}${minutes}${ColorANSI.BRIGHT_GREEN} m ${ColorANSI.RESET}: ${ColorANSI.BRIGHT_CYAN}${secs}${ColorANSI.BRIGHT_GREEN} s${ColorANSI.RESET}`;
    } else if (seconds < 86400) {
        return `${ColorANSI.BRIGHT_CYAN}${hours} h ${ColorANSI.RESET}: ${ColorANSI.BRIGHT_CYAN}${minutes} m ${ColorANSI.RESET}: ${ColorANSI.BRIGHT_CYAN}${secs} s${ColorANSI.RESET}`;
    } else {
        return `${ColorANSI.BRIGHT_CYAN}${days}${ColorANSI.BRIGHT_GREEN} d ${ColorANSI.RESET}: ${ColorANSI.BRIGHT_CYAN}${hours}${ColorANSI.BRIGHT_GREEN} h ${ColorANSI.RESET}: ${ColorANSI.BRIGHT_CYAN}${minutes}${ColorANSI.BRIGHT_GREEN} m ${ColorANSI.RESET}: ${ColorANSI.BRIGHT_CYAN}${secs}${ColorANSI.BRIGHT_GREEN} s${ColorANSI.RESET}`;
    }
    }

export async function sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
}