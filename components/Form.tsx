import useLoginModal from "@/hooks/useLoginModal";
import useRegisterModal from "@/hooks/useRegisterModal";
import useCurrentUser from '@/hooks/userCurrentUser';
import usePosts from "@/hooks/usePosts";
import { useCallback, useState } from "react";
import { toast } from "react-hot-toast";
import axios from "axios";

interface FormProps {
    placeholder: string;
    isComment?: boolean;
    postId?: string;

}

const Form: React.FC<FormProps> = ({
    placeholder,
    isComment,
    postId
}) => {
    const registerModal = useRegisterModal();
    const loginModal = useLoginModal();

    const { data: currentUser} = useCurrentUser();
    const { mutate: mutatePosts } = usePosts(postId as string);

    const  [body, setBody] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const onSubmit = useCallback(async () => {
        try {
            setIsLoading(true);

            await axios.post('/api/posts', { body });

            toast.success('Tweet Created');

            setBody('');
            mutatePosts();

        } catch (error) {
            toast.error('Something went wrong:(');
        } finally {
            setIsLoading(false);
        }
    }, [body, mutatePosts]);
  return (
    <div className='border-b-[1px] border-neutral-800 px-5 py-2'>
        
    </div>
  );
}

export default Form;