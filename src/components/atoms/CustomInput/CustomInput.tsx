import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Icon } from "@iconify/react";
import { HTMLInputTypeAttribute, useState } from 'react';
import { Control, FieldValues, Path } from 'react-hook-form';

type Props<T extends FieldValues> = {
    label: string | JSX.Element;
    name: Path<T>;
    placeholder?: string;
    type?: HTMLInputTypeAttribute;
    control: Control<T>;
};

export default function CustomInput<T extends FieldValues>({
    label,
    name,
    placeholder,
    type = 'text',
    control,
}: Props<T>) {
    const [isVisible, setIsVisible] = useState(false);
    const toggleVisibility = () => setIsVisible(!isVisible);

    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <FormItem className="w-full">
                    <FormLabel>{label}</FormLabel>
                    <div className="relative">
                        <FormControl>
                            <Input
                                autoComplete="off"
                                type={type === 'password' && isVisible ? 'text' : type}
                                placeholder={placeholder}
                                className={type === 'password' ? 'pr-12' : ''}
                                {...field}
                            />
                        </FormControl>
                        {type === 'password' && (
                            <div
                                onClick={toggleVisibility}
                                className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer p-1 text-neutral-500 hover:text-neutral-700"
                            >
                                <Icon
                                    fontSize="1.25rem"
                                    icon={isVisible ? "tabler:eye" : "tabler:eye-off"}
                                />
                            </div>
                        )}
                    </div>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
}