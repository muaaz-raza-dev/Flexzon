import 'react-quill/dist/quill.snow.css';
import AdditionalInfoB from './AdditionalInfoB';
import BannerUploadB from './BannerUpload';
import BlogEditor from './BlogEditor';
import { toast } from 'react-hot-toast';
import { useEffect } from 'react';
import PublishBlog from './PublishBlog';

const WriteFile = () => {
  useEffect(() => {
    if (localStorage.getItem("Banner_Post")) {
      toast.success("Draft recovered")
    }
}, []);
  return (
    <div className='w-full  flex items-center py-4 gap-y-8 my-4 flex-col'>
        <h1 className='text-3xl hFont'>Post Banner </h1>
<BannerUploadB/>
        <h1 className='text-3xl hFont'>Write your Post </h1>
 <BlogEditor/>
        <div className="w-[90%]">
<AdditionalInfoB/>
        </div>
<PublishBlog/>
    </div>
  )
}

export default WriteFile