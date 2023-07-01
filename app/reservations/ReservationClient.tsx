"use client";

import React, { useCallback, useState } from 'react'
import { toast } from 'react-hot-toast';
import axios from 'axios';
import { useRouter } from 'next/navigation';

import { SafeReservation, SafeUser } from '../types';

import Heading from '../components/Heading';
import Container from '../components/Container';
import ListingCard from '../components/listing/ListingCard';

interface ReservationClientProps {
    reservations: SafeReservation[];
    currentUser?: SafeUser | null;
}

const ReservationClient: React.FC<ReservationClientProps> = ({
    reservations,
    currentUser
}) => {
    const router = useRouter();
    const [deletingId,setDeletingId] = useState('');

    const onCancel = useCallback((id: string) => {
        setDeletingId(id);

        axios.delete(`/api/reservations/${id}`)
        .then(() => {
            toast.success('Reservation Cancelled');
            router.refresh();
        })
        .catch(() => {
            toast.error('Something went wrong.');
        })
        .finally(() => {
            setDeletingId('');
        })
    },[router])

  return (
    <Container>
        <Heading 
            title='Reservation'
            subtitle='Booking on your Properties'
        />
        <div className='
            mt-10
            grid
            grid-cols-1
            sm:grid-cols-2
            md:grid-cols-3
            lg:grid-cols-4
            xl:grid-cols-5
            2xl:grid-cols-6
            gap-8
        '>
            {reservations.map((reservation) => (
                <ListingCard 
                    key={reservation.id}
                    data={reservation.Listing}
                    reservation={reservation}
                    actionId={reservation.id}
                    onAction={onCancel}
                    disabled={deletingId === reservation.id}
                    actionLabel='Cancel guests reservation'
                    currentUser={currentUser}
                />
            ))}
        </div>
    </Container>
  )
}

export default ReservationClient