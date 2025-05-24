import { login } from "@/utils/apis/auth";
import { useMutation } from "@tanstack/react-query";

const useLogin = () => {
    const { mutate, isPending } = useMutation({
        mutationFn: login.bind(null),
        onError: () => {
            console.log("error");
        },
    });
    return { login: mutate, isPending };
};

export default useLogin;
