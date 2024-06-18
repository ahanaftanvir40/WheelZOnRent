// import React from 'react';
import { useForm } from 'react-hook-form';

const BookingModal = () => {
    const { register, handleSubmit, errors } = useForm();

    const onSubmit = data => {
        fetch('/bookings', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <input name="vehicleId" ref={register({ required: true })} placeholder="Vehicle ID" />
            {errors.vehicleId && <p>This field is required</p>}

            <input name="driverId" ref={register} placeholder="Driver ID" />

            <input name="ownerId" ref={register({ required: true })} placeholder="Owner ID" />
            {errors.ownerId && <p>This field is required</p>}

            <input name="userId" ref={register({ required: true })} placeholder="User ID" />
            {errors.userId && <p>This field is required</p>}

            <input name="bookingStart" type="datetime-local" ref={register({ required: true })} />
            {errors.bookingStart && <p>This field is required</p>}

            <input name="bookingEnd" type="datetime-local" ref={register({ required: true })} />
            {errors.bookingEnd && <p>This field is required</p>}

            <input name="totalAmount" ref={register({ required: true })} placeholder="Total Amount" />
            {errors.totalAmount && <p>This field is required</p>}

            <input type="submit" />
        </form>
    );
};

export default BookingModal;