import { PlayersGetByGroup } from "./PlayersGetByGroup";

export async function playerGetByGroupAndTeam(group: string, team: string) {
    try {
        
        const storage = await PlayersGetByGroup(group)
        const players = storage.filter(player => player.team === team)

    } catch (e) {
        throw e
    }
    
}