import { Notice } from "obsidian";

export class TableClipboardService {
	async copyTag(tag: string): Promise<void> {
		try {
			await navigator.clipboard.writeText(tag);

			new Notice(`Tag copied: ${tag}`);
		} catch (error) {
			console.error(
				"[Obsidium] Failed to copy tag",
				error
			);

			new Notice("Failed to copy tag");
		}
	}
}