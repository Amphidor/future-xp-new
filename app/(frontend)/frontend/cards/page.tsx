
"use client"
import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function Cards() {



    return (
        <div className="content">
            <div className="all-card-1">
                <a className="card" href="#!">
                    <div className="front">
                        <img src="/frontend/img-11.jpg" className='width:100%;' />

                    </div>
                    <div className="back">
                        <div className="All-cont">
                            <h1>Doctor</h1>

                            <p>Explains medical conditions and treatments clearly to patients and families, and listens
                                actively.</p>

                            <ul className="bullet-point">
                                <li>Strong clinical assessment and diagnostic abilities</li>
                                <li>Excellent communication and patient counseling skills</li>
                                <li>Ability to work in a fast-paced environment</li>
                                <li>Team collaboration with nurses and healthcare staff</li>
                            </ul>


                        </div>
                    </div>

                    <div className="icons">
                        <img src="/frontend/dislike.png" />
                    </div>

                    <div className="icos">
                        <img src="/frontend/star-1.png" />
                    </div>

                </a>

                <a className="card" href="#!">
                    <div className="front">
                        <img src="/frontend/img-12.jpg" className='width:100%;' />
                    </div>
                    <div className="back">
                        <div className="All-cont">
                            <h1>Police</h1>
                            <p>Able to make clear decisions in emergencies or dangerous situations.</p>

                            <ul className="bullet-point">
                                <li>Ability to read, write, and speak the country’s official language</li>
                                <li>English proficiency is often mandatory for international roles</li>
                                <li>Knowledge of law enforcement procedures</li>
                                <li>Report writing and documentation</li>
                            </ul>

                        </div>
                    </div>

                    <div className="icons">
                        <img src="/frontend/dislike.png" />
                    </div>

                    <div className="icos">
                        <img src="/frontend/star-1.png" />
                    </div>

                </a>

                <a className="card" href="#!">
                    <div className="front">
                        <img src="/frontend/img-14.jpg" className='width:100%;' />
                    </div>
                    <div className="back">
                        <div className="All-cont">
                            <h1>Teacher</h1>
                            <p>Supports students with different learning speeds and backgrounds</p>

                            <ul className="bullet-point">
                                <li>Bachelor’s degree in Education or relevant subject</li>
                                <li>Teaching qualification / license (B.Ed., PGCE, state certification, etc.)</li>
                                <li>Master’s degree preferred for higher grades or specialized roles</li>
                                <li>2–5 years of classroom teaching experience (varies)</li>
                            </ul>
                        </div>
                    </div>

                    <div className="icons">
                        <img src="/frontend/dislike.png" />
                    </div>

                    <div className="icos">
                        <img src="/frontend/star-1.png" />
                    </div>

                </a>

                <a className="card" href="#!">
                    <div className="front">
                        <img src="/frontend/img-13.jpg" className='width:100%;' />
                    </div>
                    <div className="back">
                        <div className="All-cont">
                            <h1>Army</h1>
                            <p>Consectetur adipisicing elit. Possimus, praesentium?</p>

                            <ul className="bullet-point">
                                <li>Citizenship or permanent residency is often mandatory</li>
                                <li>Technical or university degree required for specialized positions</li>
                                <li>Ability to read, write, and speak the national language</li>
                                <li>Adaptability in challenging environments</li>
                            </ul>

                        </div>
                    </div>

                    <div className="icons">
                        <img src="/frontend/dislike.png" />
                    </div>

                    <div className="icos">
                        <img src="/frontend/star-1.png" />
                    </div>


                </a>

                <a className="card" href="#!">
                    <div className="front">
                        <img src="/frontend/img-15.jpg" className='width:100%;' />
                    </div>
                    <div className="back">
                        <div className="All-cont">
                            <h1>Developer</h1>
                            <p>Enjoys solving complex problems using logic and structured approaches</p>

                            <ul className="bullet-point">
                                <li>Bachelor’s degree in Computer Science, IT, or related field</li>
                                <li>Equivalent practical experience may be accepted</li>
                                <li>2–5+ years of professional development experience (varies by level)</li>
                                <li>Experience working in agile/team environments is a plu6</li>
                            </ul>

                        </div>
                    </div>

                    <div className="icons">
                        <img src="/frontend/dislike.png" />
                    </div>

                    <div className="icos">
                        <img src="/frontend/star-1.png" />
                    </div>

                </a>

                <a className="card" href="#!">
                    <div className="front">
                        <img src="/frontend/img-16.jpg" className='width:100%;' />
                    </div>
                    <div className="back">
                        <div className="All-cont">
                            <h1>Farmer</h1>
                            <p>Understands that crops and livestock require time and consistent care.</p>

                            <ul className="bullet-point">
                                <li>Training or diploma in agriculture, horticulture, or animal care is a plus</li>
                                <li>Hands-on farming or livestock experience preferred</li>
                                <li>Knowledge of planting, harvesting, irrigation, or machinery operation</li>
                                <li>Experience with dairy/poultry/greenhouse (if specialized)</li>
                            </ul>

                        </div>
                    </div>

                    <div className="icons">
                        <img src="/frontend/dislike.png" />
                    </div>

                    <div className="icos">
                        <img src="/frontend/star-1.png" />
                    </div>

                </a>



            </div>
        </div>
    );
}
