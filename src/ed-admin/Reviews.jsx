import React, { useEffect, useState } from 'react'
import Sidebar from './Sidebar'
import { getAllCommentsAPI, getAllFlaggedCommentsAPI, updateCommentAPI } from '../api/allAPI';
import DashboardSkeleton from './DashboardSkeleton ';
import { Link } from 'react-router-dom';

const Reviews = () => {

  const token = sessionStorage.getItem('adminToken')
  const headers = {
    'Authorization': `Bearer ${token}`,
  }

  const [edComments, setEdComments] = useState([])
  const [isLoading, setIsLoading] = useState(false);
  const [flaggedComments, setFlaggedComments] = useState([]);

  useEffect(() => {
    Promise.all([
      getAllCommentsAPI(headers).then((res) => res.status === 200 && setEdComments(res.data)),
      getAllFlaggedCommentsAPI(headers).then((res) => res.status === 200 && setFlaggedComments(res.data)),
    ]).finally(() => setIsLoading(false));
  }, []);

  const updateComment = async (commentId) => {
    const id = typeof commentId === 'object' ? commentId.$oid : commentId;
    
    try {
      const result = await updateCommentAPI(id, headers);
      if (result.status === 200) {
        alert('Comment updated successfully');
        window.location.reload();
      }else{
        alert('Failed to update comment');
        console.log(result.response);
      }
    } catch (err) {
      console.log(err);
    }
  }

  if (isLoading) return <DashboardSkeleton />;
console.log(flaggedComments);

  return (
    <>
      <div className="row ed-minheight">

        <div className="col-lg-3">
          <Sidebar />
        </div>

        <div className="col-lg-9">
          <h1 className="mt-3">Reviews</h1>
          <p>Total Reviews: {edComments?.Reviews?.length}, Total Replies: {edComments?.Replies?.length}, Total Flagged: {flaggedComments?.length}</p>
          <div>
            <table className="table table-dark table-striped">
              <thead>
                <tr>
                  <th style={{width:'5%'}}>#</th>
                  <th style={{width:'40%'}}>Comment</th>
                  <th style={{width:'10%'}}>User</th>
                  <th style={{width:'40%'}}>Reason</th>
                  <th style={{width:'5%'}}>Remove</th>
                </tr>
              </thead>
              <tbody>
                {
                  flaggedComments.map((comment, index) => (
                    <tr key={index}>
                      <td style={{width:'5%'}}>{index+1}</td>
                      <td style={{width:'40%'}}><Link to={`../${comment?.collegeId}/view`}>{comment?.message}</Link></td>
                      <td style={{width:'10%'}}>{comment?.userId?.username}</td>
                      <td style={{width:'40%'}}>
                        {
                          comment?.reports?.map((item,index) => (
                            <div key={index}>
                              <p>{item?.userId?.username +': '+ item?.reason}</p>
                            </div>
                          ))
                        }
                      </td>
                      <td style={{width:'5%'}}>
                        <button onClick={()=>updateComment(comment._id)} className='btn text-danger'><i className="fa-solid fa-trash"></i></button>
                      </td>
                    </tr>
                  ))
                }
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </>
  )
}

export default Reviews