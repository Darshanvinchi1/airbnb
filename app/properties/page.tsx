import EmptyState from "../components/EmptyState";
import ClientOnly from "../components/ClientOnly";

import getCurrentUser from "../actions/getCurrentUser";
import PropertiesClient from "./PropertiesClient";
import getListing from "../actions/getListing";

const PropertiesPage = async () => {
    const currentUser  = await getCurrentUser();

    if(!currentUser){
        return (
            <ClientOnly>
                <EmptyState 
                    title="Unauthrized"
                    subTitle="Please login"
                />
            </ClientOnly>
        )
    }

    const listings = await getListing({
        userId: currentUser.id
    });

    if(listings.length === 0) {
        return (
            <ClientOnly>
                <EmptyState 
                    title="No Properties found"
                    subTitle="Looks like you have no properties."
                />
            </ClientOnly>
        )
    }

    return(
        <ClientOnly>
            <PropertiesClient 
                listings={listings}
                currentUser={currentUser}
            />
        </ClientOnly>
    )
}

export default PropertiesPage;