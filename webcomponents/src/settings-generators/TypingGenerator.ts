import {ComponentData} from "../types";

export interface TypingGenerator {
	(data: ComponentData[]): string;
}
