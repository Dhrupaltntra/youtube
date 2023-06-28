import React from "react";
import CommonLayout from '../../core/common/layout/ThemeLayout/Layout'
import nestedData from "../../constant/cities";

const nested = () => {

  const renderList = (data) => {
    return data?.map((child) => (
      <>
        {child?.children ?(
          <ol>
            <li>
              {child?.name}
              <ul>
                <li>{renderList(child?.children)}</li>
              </ul>
            </li>
          </ol>
        ) : (
          <ul>
            <li>{child?.name}</li>
          </ul>
        )}
      </>
    )
    )}

  return(
    <CommonLayout>
      {
        renderList(nestedData)
      }
      {
        nestedData?.map(item => (
          <>
            <div>
              <h2>{item?.name}</h2>
              <ul>
                {item?.children?.map(child => (
                  <li><span>{child?.name}</span>
                    <ul>
                      {
                        child?.children?.map(child => (
                          <li><span>{child?.name}</span>
                            <ul>
                              {
                                child?.children?.map(child => (
                                  <li>{child?.name}</li>
                                ))
                              }
                            </ul>
                          </li>
                        ))
                      }
                    </ul>
                  </li>
                ))}
              </ul>
            </div>
          </>
        ))
      }
      {
        nestedData?.map(item => (
          <>
            <div>
              <h2>{item?.name}</h2>
            </div>
          </>
        ))
      }
    </CommonLayout>
  )
}

export default nested