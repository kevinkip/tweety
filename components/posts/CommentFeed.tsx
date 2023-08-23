import { useRouter } from 'next/router';
import { useCallback, useMemo } from 'react';
import { formatDistanceToNowStrict } from 'date-fns';

import Avatar from '../Avatar';

interface CommentItemProps {
  comments: Record<string, any>;
}

const CommentItem: React.FC<CommentItemProps> = ({ comments = {} }) => {
  const router = useRouter();

  const goToUser = useCallback((ev: any) => {
    ev.stopPropagation();

    router.push(`/users/${comments.user.id}`)
  }, [router, comments.user.id]);

  const createdAt = useMemo(() => {
    if (!comments?.createdAt) {
      return null;
    }

    return formatDistanceToNowStrict(new Date(comments.createdAt));
  }, [comments.createdAt])

  return (
    <div 
      className="
        border-b-[1px] 
        border-neutral-800 
        p-5 
        cursor-pointer 
        hover:bg-neutral-900 
        transition
      ">
      <div className="flex flex-row items-start gap-3">
        <Avatar userId={comments.user.id} />
        <div>
          <div className="flex flex-row items-center gap-2">
            <p 
              onClick={goToUser} 
              className="
                text-white 
                font-semibold 
                cursor-pointer 
                hover:underline
            ">
              {comments.user.name}
            </p>
            <span 
              onClick={goToUser} 
              className="
                text-neutral-500
                cursor-pointer
                hover:underline
                hidden
                md:block
            ">
              @{comments.user.username}
            </span>
            <span className="text-neutral-500 text-sm">
              {createdAt}
            </span>
          </div>
          <div className="text-white mt-1">
            {comments.body}
          </div>
        </div>
      </div>
    </div>
  )
}

export default CommentItem;