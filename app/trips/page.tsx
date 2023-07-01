import EmptyState from "../components/EmptyState";
import ClientOnly from "../components/ClientOnly";

import getCurrentUser from "../actions/getCurrentUser";
import getReservation from "../actions/getReservations";
import TripsClinet from "./TripsClinet";

const TripsPage = async () => {
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

    const reservation = await getReservation({
        userId: currentUser.id
    });

    if(reservation.length === 0) {
        return (
            <ClientOnly>
                <EmptyState 
                    title="No trips found"
                    subTitle="Looks like you haven't reserved any trips."
                />
            </ClientOnly>
        )
    }

    return(
        <ClientOnly>
            <TripsClinet 
                reservations={reservation}
                currentUser={currentUser}
            />
        </ClientOnly>
    )
}

export default TripsPage;