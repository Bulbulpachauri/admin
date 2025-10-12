import React, { useState } from "react";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { Link } from 'react-router-dom';
import { Rating } from "@mui/material";
import { ProductZoom } from '../../components/ProductZoom';
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import ProductSlider from "../../components/ProductsSlider"
import { ProductDetailsComponent } from "../../components/ProductDetails";

export const ProductDetails = () => {

  const [activeTab, setActiveTab] = useState(0);

  return (
    <>
      <div className="py-5">
        <div className="container flex gap-8 items-center">
          <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="inherit" to="/" className="link transition !text-[14px]">
              Home
            </Link>
            <Link
              underline="hover"
              color="inherit"
              to="/"
              className="link transition !text-[14px]"
            >
              Fashion
            </Link>

            <Link
              underline="hover"
              color="inherit"
              to="/"
              className="link transition !text-[14px]"
            >
              Cropped Satin Bomber Jacket
            </Link>
          </Breadcrumbs>
        </div>
      </div>

      <section className="bg-white py-5">
        <div className="container flex gap-8 items-center">
          <div className="productZoomContainer w-[40%]">
            <ProductZoom />
          </div>

          <div className="productContent w-[60%] pr-10 pd-10">
            <ProductDetailsComponent />
          </div>
        </div>


        <div className="containern pt-8">
          <div className="flex items-center gap-8">
            <span className={`link text-[17px] cursor-pointer font-[500] ${activeTab == 0 && 'text-red-500'}`} onClick={() => setActiveTab(0)}>Description</span>
            <span className={`link text-[17px] cursor-pointer font-[500] ${activeTab == 1 && 'text-red-500'}`} onClick={() => setActiveTab(1)}>ProductDetails</span>
            <span className={`link text-[17px] cursor-pointer font-[500] ${activeTab == 2 && 'text-red-500'}`} onClick={() => setActiveTab(2)}>Reviews (5)</span>
          </div>


          {
            activeTab === 0 && (
              <div className="shadow-md w-full py-5 px-8 rounded-md">
                <p className="p-5">Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione nesciunt explicabo perspiciatis qui! Cupiditate, ipsum inventore quos a possimus aliquam autem neque earum rem vitae excepturi est sint maiores quas tenetur nulla rerum quod. Numquam, eaque ab. Sint error, numquam minus aut molestiae sed, animi officia pariatur eligendi recusandae rem.</p>
                <h4>Lightweight Design</h4>
                <p className="p-5">Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione nesciunt explicabo perspiciatis qui! Cupiditate, Numquam, eaque ab. Sint error, numquam minus aut molestiae sed, animi officia pariatur eligendi recusandae rem.</p>

                <h4>Free Shipping & Return</h4>
                <p className="p-5">Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione nesciunt explicabo perspiciatis qui! Cupiditate, , eaque ab. Sint error, numquam minus aut molestiae sed, animi officia pariatur eligendi recusandae rem.</p>

                <h4>Money Back Guarantee</h4>
                <p className="p-5">Lorem ipsum dolor sit amet consectetur adipisicing elit.est sint maiores quas tenetur nulla rerum quod. Numquam, eaque ab. Sint error, numquam minus aut molestiae sed, animi officia pariatur eligendi recusandae rem.</p>

                <h4>Online Support</h4>
                <p className="p-5">Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione nesciunt
                  numquam minus aut molestiae sed, animi officia pariatur eligendi recusandae rem.</p>

              </div>
            )}

          {activeTab === 1 && (
            <div className="shadow-md w-full py-5 px-8 rounded-md">
              <div class="relative overflow-x-auto">
                <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                  <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                      <th scope="col" class="px-6 py-3">
                        StandUp
                      </th>
                      <th scope="col" class="px-6 py-3">
                        Folded (w/0 wheels)
                      </th>
                      <th scope="col" class="px-6 py-3">
                        Folded (w/0 wheels)
                      </th>
                      <th scope="col" class="px-6 py-3">
                        Door Pass Through
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                      <td class="px-6 py-4">
                        35″L x 24″W x 37-45″H(front to back wheel)
                      </td>
                      <td class="px-6 py-4">
                        32.5″L x 18.5″W x 16.5″H
                      </td>
                      <td class="px-6 py-4">
                        32.5″L x 24″W x 18.5″H
                      </td>
                      <td class="px-6 py-4">
                        24
                      </td>
                    </tr>

                    <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                      <td class="px-6 py-4">
                        35″L x 24″W x 37-45″H(front to back wheel)
                      </td>
                      <td class="px-6 py-4">
                        32.5″L x 18.5″W x 16.5″H
                      </td>
                      <td class="px-6 py-4">
                        32.5″L x 24″W x 18.5″H
                      </td>
                      <td class="px-6 py-4">
                        24
                      </td>
                    </tr>

                    <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                      <td class="px-6 py-4">
                        35″L x 24″W x 37-45″H(front to back wheel)
                      </td>
                      <td class="px-6 py-4">
                        32.5″L x 18.5″W x 16.5″H
                      </td>
                      <td class="px-6 py-4">
                        32.5″L x 24″W x 18.5″H
                      </td>
                      <td class="px-6 py-4">
                        24
                      </td>
                    </tr>

                    <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                      <td class="px-6 py-4">
                        35″L x 24″W x 37-45″H(front to back wheel)
                      </td>
                      <td class="px-6 py-4">
                        32.5″L x 18.5″W x 16.5″H
                      </td>
                      <td class="px-6 py-4">
                        32.5″L x 24″W x 18.5″H
                      </td>
                      <td class="px-6 py-4">
                        24
                      </td>
                    </tr>

                    <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                      <td class="px-6 py-4">
                        35″L x 24″W x 37-45″H(front to back wheel)
                      </td>
                      <td class="px-6 py-4">
                        32.5″L x 18.5″W x 16.5″H
                      </td>
                      <td class="px-6 py-4">
                        32.5″L x 24″W x 18.5″H
                      </td>
                      <td class="px-6 py-4">
                        24
                      </td>
                    </tr>

                    <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                      <td class="px-6 py-4">
                        35″L x 24″W x 37-45″H(front to back wheel)
                      </td>
                      <td class="px-6 py-4">
                        32.5″L x 18.5″W x 16.5″H
                      </td>
                      <td class="px-6 py-4">
                        32.5″L x 24″W x 18.5″H
                      </td>
                      <td class="px-6 py-4">
                        24
                      </td>
                    </tr>

                    <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                      <td class="px-6 py-4">
                        35″L x 24″W x 37-45″H(front to back wheel)
                      </td>
                      <td class="px-6 py-4">
                        32.5″L x 18.5″W x 16.5″H
                      </td>
                      <td class="px-6 py-4">
                        32.5″L x 24″W x 18.5″H
                      </td>
                      <td class="px-6 py-4">
                        24
                      </td>
                    </tr>

                    <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                      <td class="px-6 py-4">
                        35″L x 24″W x 37-45″H(front to back wheel)
                      </td>
                      <td class="px-6 py-4">
                        32.5″L x 18.5″W x 16.5″H
                      </td>
                      <td class="px-6 py-4">
                        32.5″L x 24″W x 18.5″H
                      </td>
                      <td class="px-6 py-4">
                        24
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}


          {
            activeTab === 2 && (
              <div className="shadow-md w-[80%] py-5 px-8 rounded-md">
                <div className="w-full productReviewsContainer">
                  <h2 className="text-[18px]">Customar questions & answer</h2>

                  <div className="reviewscroll w-full max-h-[300px] overflow-y-scroll overflow-x-hidden mt-5 pr-5">
                    <div className="review pt-5 pb-5 border-b border-[rgba(0,0,0,0.1)] w-full flex item-center justify-between">
                      <div className="info w-[60%] flex items-center gap-3">
                        <div className="img w-[80px] h-[80px] overflow-hidden rounded-full">
                          <img src="https://th.bing.com/th/id/OIP.Oxih0TmoFrIEyTj1PihLeQHaFL?w=260&h=182&c=7&r=0&o=7&pid=1.7&rm=3" className="w-full" />
                        </div>

                        <div className="w-[80%]">
                          <h4 className="text-[16px]">Rinku Verma</h4>
                          <h5 className="text-[13px]">2025-09-06</h5>
                          <p className="mt-0 mb-0">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,</p>
                        </div>
                      </div>

                      <Rating name="size-small" defaultValue={4} size="small" readOnly />
                    </div>
                    <div className="review pt-5 pb-5 border-b border-[rgba(0,0,0,0.1)] w-full flex item-center justify-between">
                      <div className="info w-[60%] flex items-center gap-3">
                        <div className="img w-[80px] h-[80px] overflow-hidden rounded-full">
                          <img src="https://th.bing.com/th/id/OIP.Oxih0TmoFrIEyTj1PihLeQHaFL?w=260&h=182&c=7&r=0&o=7&pid=1.7&rm=3" className="w-full" />
                        </div>

                        <div className="w-[80%]">
                          <h4 className="text-[16px]">Rinku Verma</h4>
                          <h5 className="text-[13px]">2025-09-06</h5>
                          <p className="mt-0 mb-0">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,</p>
                        </div>
                      </div>

                      <Rating name="size-small" defaultValue={4} size="small" readOnly />
                    </div>
                    <div className="review pt-5 pb-5 border-b border-[rgba(0,0,0,0.1)] w-full flex item-center justify-between">
                      <div className="info w-[60%] flex items-center gap-3">
                        <div className="img w-[80px] h-[80px] overflow-hidden rounded-full">
                          <img src="https://th.bing.com/th/id/OIP.Oxih0TmoFrIEyTj1PihLeQHaFL?w=260&h=182&c=7&r=0&o=7&pid=1.7&rm=3" className="w-full" />
                        </div>

                        <div className="w-[80%]">
                          <h4 className="text-[16px]">Rinku Verma</h4>
                          <h5 className="text-[13px]">2025-09-06</h5>
                          <p className="mt-0 mb-0">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,</p>
                        </div>
                      </div>

                      <Rating name="size-small" defaultValue={4} size="small" readOnly />
                    </div>
                    <div className="review pt-5 pb-5 border-b border-[rgba(0,0,0,0.1)] w-full flex item-center justify-between">
                      <div className="info w-[60%] flex items-center gap-3">
                        <div className="img w-[80px] h-[80px] overflow-hidden rounded-full">
                          <img src="https://th.bing.com/th/id/OIP.Oxih0TmoFrIEyTj1PihLeQHaFL?w=260&h=182&c=7&r=0&o=7&pid=1.7&rm=3" className="w-full" />
                        </div>

                        <div className="w-[80%]">
                          <h4 className="text-[16px]">Rinku Verma</h4>
                          <h5 className="text-[13px]">2025-09-06</h5>
                          <p className="mt-0 mb-0">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,</p>
                        </div>
                      </div>

                      <Rating name="size-small" defaultValue={4} size="small" readOnly />
                    </div>

                  </div>

                  <br />

                  <div className="reviewForm bg-[#f1f1f1] p-4 rounded-md">
                    <h2 className="text-[18px]">Add a review</h2>

                    <form className="w-full mt-5">
                      <TextField
                        id="outline-multiline-flexible"
                        aria-label="Write a review..."
                        className="w-full"
                        multiline
                        rows={5}
                      />

                      <br /><br />
                      <Rating name="size-small" defaultValue={4} />

                      <div className="flex items-center mt-5">
                        <Button className="btn-org">Submit Review</Button>
                      </div>

                    </form>
                  </div>
                </div>
              </div>
            )}
        </div>


        <div className="container pt-8">
          <h2 className="text-[20px] font-[600] pb-1">Related Products</h2>
          <ProductSlider items={6} />
        </div>

      </section>
    </>
  );
};
