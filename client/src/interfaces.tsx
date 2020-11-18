export interface user {
    userId: string,
    username: string,
    description: string,
    legoSets: any,
    followed: user[],
    created: string,
    
    linkedAccounts?: {
        facebook: string,
        instagram: string,
        discord: string
    }
}

export interface legoSet {
    creator: user,
    creatorId: string
    images: string[],
    description: string,
    price: number | string,
    partCount: number,
    legoType: string,
    size: string,
    minimalAge: number,
    rating: number


    forSale?:{
        forSale: boolean,
        price: number | string,
        location: string
    }
    existingSet?: {
        existingSet: boolean,
        URL: string
    },

}