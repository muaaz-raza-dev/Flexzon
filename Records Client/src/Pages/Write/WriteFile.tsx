import 'react-quill/dist/quill.snow.css';
import AdditionalInfoB from './AdditionalInfoB';
import BannerUploadB from './BannerUpload';
import BlogEditor from './BlogEditor';
import { toast } from 'react-hot-toast';
import { useEffect } from 'react';
import PublishBlog from './PublishBlog';
import { useAppSelector } from '@/app/ReduxHooks';

const WriteFile = () => {
  let title =useAppSelector(s=>s.write.title)
  useEffect(() => {
    if (localStorage.getItem("Banner_Post")) {
      toast.success("Draft recovered")
    }
}, []);
  return (
    <div className='w-full  flex items-center py-4 gap-y-2 my-4 flex-col'>
        <h1 className='text-3xl hFont font-bold'> {title || "New Article Draft"}  </h1>
<BannerUploadB/>
 <BlogEditor/>
        <div className="md:w-[90%] max-md:w-[95%] my-2">
<AdditionalInfoB/>
        </div>
<PublishBlog/>
    </div>
  )
}

export default WriteFile