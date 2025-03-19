import {useMutation} from '@tanstack/react-query';
import {createImage, createImageRequestBody} from "@/services/app.service.ts";

// Custom hook for creating an image
export function useCreateImage(reqBody: createImageRequestBody) {
    return useMutation({
        mutationFn: () => createImage(reqBody),
        onSuccess: (data) => {
            console.log('Image created successfully:', data);
            return data;
        },
        onError: (error) => {
            console.error('Error creating image:', error.message);
        },
    });
}