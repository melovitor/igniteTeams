import AsyncStorage from "@react-native-async-storage/async-storage";
import { GROUP_COLECTION } from "@storage/storageConfig";
import { getAllGroups } from "./getAllGoups";

export async function groupCrate(newGroup: string) {
    try {
        const storedGroups = await getAllGroups()
        const storage = JSON.stringify([...storedGroups, newGroup])
        await AsyncStorage.setItem(GROUP_COLECTION, storage)
    } catch (e) {
        throw e
    }
}