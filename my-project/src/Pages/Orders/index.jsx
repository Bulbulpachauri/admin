import React, { useState } from 'react'
import AccountSidebar from '../../components/AccountSidebar';
import Badge from '../../components/Badge';
import { Button } from '@mui/material';
import { FaAngleDown } from 'react-icons/fa6';
import { FaAngleUp } from 'react-icons/fa6';

const Orders = () => {

  const [isOpenOrderdProduct, setIsOpenOrderdProduct] = useState(false);

  const isShowOrderdProduct = (index) => {
    if(isOpenOrderdProduct === index){
      setIsOpenOrderdProduct(null);
    }else{
    setIsOpenOrderdProduct(index);
    }
  };

  return (
    <section className="py-10 w-full">
      <div className="container flex gap-5">
        <div className="col1 w-[25%]">
          <div className="rounded-md p-8">
            <AccountSidebar />
          </div>
        </div>

        <div className="col2 w-[80%] ">
          <div className="shadow-md rounded-md bg-white">
            <div className="py-5 px-3 border-b border-[rgba(0,0,0,0.1)">
              <h2>My Orders</h2>
              <p className="mt-0 mb-5">There are <span className="font-bold text-red-500">2</span> Orders</p>

              <div className="relative overflow-x-auto mt-5">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                      <th scope="col" className="px-6 py-3 whitespace-nowrap">
                        &nbsp;
                        </th>

                      <th scope="col" className="px-6 py-3 whitespace-nowrap">
                        Order Id
                      </th>

                      <th scope="col" className="px-6 py-3 whitespace-nowrap">
                        Paymant Id
                      </th>

                      <th scope="col" className="px-6 py-3 whitespace-nowrap">
                        Name
                      </th>

                      <th scope="col" className="px-6 py-3 whitespace-nowrap">
                        Phone Number
                      </th>

                      <th scope="col" className="px-6 py-3 whitespace-nowrap">
                        Address
                      </th>

                      <th scope="col" className="px-6 py-3 whitespace-nowrap">
                        Pincode
                      </th>

                      <th scope="col" className="px-6 py-3 whitespace-nowrap">
                        Total Amount
                      </th>

                      <th scope="col" className="px-6 py-3 whitespace-nowrap">
                        Email
                      </th>

                      <th scope="col" className="px-6 py-3 whitespace-nowrap">
                        User Id
                      </th>

                      <th scope="col" className="px-6 py-3 whitespace-nowrap">
                        Order Status
                      </th>

                      <th scope="col" className="px-6 py-3 whitespace-nowrap">
                        Date
                      </th>

                    </tr>

                    
                  </thead>
                  <tbody>
                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                      <td className="px-6 py-4 font-[500]">
                        <Button className="!w-[40px] !h-[40px] !min-w-[40px] !rounded-full !bg-[#f1f1f1]"
                         onClick={() => isShowOrderdProduct(1)}
                         >
                          {
                            isOpenOrderdProduct === 1 ? <FaAngleUp className="text-[16px] 
                            text-[rgba(0,0,0,0.7)]" /> : <FaAngleDown className="text-[16px] text-[rgba(0,0,0,0.7)]" />
                          }
                          </Button>
                      </td>
                      <td className="px-6 py-4 font-[500]">
                        <span className="text-red-500">66e120733d42dc4rd19335ab</span>
                      </td>

                      <td className="px-6 py-4 font-[500]">
                        <span className="text-red-500">pay_PTPOqEXFhrtpy8</span>
                      </td>

                      <td className="px-6 py-4 font-[500]">Bulbul</td>

                      <td className="px-6 py-4 font-[500]">8171306923</td>


                      <td className="px-6 py-4 font-[500]">
                        <span className="text-red-500">GLA93lhovanbagichi ,Mathura 281204</span>
                      </td>

                      <td className="px-6 py-4 font-[500]">110053</td>

                      <td className="px-6 py-4 font-[500]">3800</td>

                      <td className="px-6 py-4 font-[500]">bulbulpachauri21@gmail.com</td>

                      <td className="px-6 py-4 font-[500]">
                        <span className="text-red-500">66e120733d42dc4rd19335ab</span>
                      </td>

                      <td className="px-6 py-4 font-[500]"><Badge status='pending' /></td>
                      <td className="px-6 py-4 font-[500] whitespace-nowrap">20-9-2025</td>
                    </tr>

                    {isOpenOrderdProduct=== 1 && (
                        <tr>
                      <td className="pl-20" colSpan="6">
                        <div className="relative overflow-x-auto">
                          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                              <tr>

                                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                                  Product Id
                                </th>

                                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                                  Product Tittle
                                </th>

                                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                                  Image
                                </th>

                                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                                  Quantity
                                </th>

                                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                                  Price
                                </th>

                                <th scope="col" className="px-6 py-3 whitespace-nowrap">
                                  Sub Total
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                <td className="px-6 py-4 font-[500]">
                                  <span className="text-gray-700">66e120733d42dc4rd19335ab</span>
                                </td>

                                <td className="px-6 py-4 font-[500]">
                                  <span className="text-red-500">A-Line Kurti Sharare & Du...</span>
                                </td>

                                <td className="px-6 py-4 font-[500] whitespace-nowrap">
                                  <img src="https://api.spicezgold.com/download/file_1734529297930_fiorra-women-s-teapot-blue-pure-cotton-a-line-kurta-with-sharara-and-dupatta-product-images-rvo9n8udfg-1-202307260626.jpg"
                                    alt="" className="w-[40px] h-[40px] object-cover rounded-md" />
                                </td>

                                <td className="px-6 py-4 font-[500]">2</td>


                                <td className="px-6 py-4 font-[500]">
                                  <span className="text-red-500">1300</span>
                                </td>

                                <td className="px-6 py-4 font-[500]">
                                  <span className="text-red-500">1300</span>
                                </td>
                              </tr>

                               <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                                <td className="px-6 py-4 font-[500]">
                                  <span className="text-gray-700">66e120733d42dc4rd19335ab</span>
                                </td>

                                <td className="px-6 py-4 font-[500]">
                                  <span className="text-red-500">A-Line Kurti Sharare & Du...</span>
                                </td>

                                <td className="px-6 py-4 font-[500] whitespace-nowrap">
                                  <img src="https://api.spicezgold.com/download/file_1734529297930_fiorra-women-s-teapot-blue-pure-cotton-a-line-kurta-with-sharara-and-dupatta-product-images-rvo9n8udfg-1-202307260626.jpg"
                                    alt="" className="w-[40px] h-[40px] object-cover rounded-md" />
                                </td>

                                <td className="px-6 py-4 font-[500]">2</td>


                                <td className="px-6 py-4 font-[500]">
                                  <span className="text-red-500">1300</span>
                                </td>

                                <td className="px-6 py-4 font-[500]">
                                  <span className="text-red-500">1300</span>
                                </td>
                              </tr>


                              <tr>
                                <td className="bg-[#f1f1f1]" colSpan="12"></td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </td>
                    </tr>
                      )}

                  </tbody>
                </table>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section >
  )
}


export default Orders;