export const statusesMap = {
    ALL: 'ALL',
    NEW: 'NEW',
    IN_WORK: 'IN_WORK',
    DONE: 'DONE'
} as const

export type TStatusesMap = keyof typeof statusesMap

export const titleByStatusMap: Record<TStatusesMap, string> = {
    [statusesMap.ALL]: 'All',
    [statusesMap.NEW]: 'New',
    [statusesMap.IN_WORK]: 'In Work',
    [statusesMap.DONE]: 'Done'
} as const

export const statuses = Object.keys(statusesMap) as TStatusesMap[];
