import EmptyState from "../components/EmptyState";
import ClientOnly from "../components/ClientOnly";

import getCurrentUser from "../actions/getCurrentUser";
import getFavoritesListing from "../actions/getFavoritesListing";
import FavoritesClient from "./FavoritesClient";

const FavoritesPage = async () => {
    const listings = await getFavoritesListing();
    const currentUser =  await getCurrentUser();

    if(listings.length === 0){
        return(
            <ClientOnly>
                <EmptyState 
                    title="No favorites found"
                    subTitle="Looks like you have no favorites listings."
                />
            </ClientOnly>
        )
    }

    return(
        <ClientOnly>
            <FavoritesClient 
                listings={listings}
                currentUser={currentUser}
            />
        </ClientOnly>
    )
}

export default FavoritesPage;