import ellipsis3 from '../../../assets/Ellipse3.svg'
import note from '../../../assets/Vector (1).svg'
import direction from '../../../assets/Vector.svg'
import calendar from '../../../assets/calendar.svg'
function AdminDashboard(){


    return (
        <section>
            <h2 className="text-base font-bold">Dashboard</h2>

            <section>
            <section className="flex flex-row p-8">
                    <section className="bg-green-three rounded-lg p-4 flex justify-center items-center mr-8">
                        <h3 className="text-white text-lg"><span>6</span><span>Active Programs</span><span>View</span></h3>
                    </section>

                    {
                        [1,2,3].map((item, i) => {
                            return (<>
                                      <section className="flex flex-col p-4 pr-[86.67px] bg-lighterGreen-two mr-8">
                <section className="flex flex-row items-center mb-4">
                    <section className="mr-4">
                        <img src={direction}  alt="Ellipsis"/>
                    </section>
                    <section className="ml-4">
        
                    <section className="flex flex-col items-center justify-between">
                    <h3 className="text-xl">Mentors</h3>
                    <span className="rounded-md w-full text-lighterGray-four"><span>30</span><span>+12%</span></span>
                    </section>
                    <img src={calendar}  alt="Calendar" className="mr-4"/>
                    </section>
                </section>

                </section>
                            
                            </>)
                        })
                    }
      
                </section>

            </section>
            <section className="flex flex-col bg-lighterGreen-three rounded-lg p-4 mb-8">
                <section className="flex flex-row items-center justify-between px-8">
                <h3 className="text-lg font-semibold">Programs Overview</h3>
                <button className="px-8 py-2 text-base bg-white">6 Active</button>
                </section>
   
                <section className="inline-flex">
              { [1,2,3].map((item, i) => {
                
                return  (<section className="flex flex-row px-8 py-4">
                <section className="flex flex-col p-4 pr-[86.67px] bg-lighterGreen-two rounded-md">
                <section className="flex flex-row items-center mb-4">
                    <section className="mr-4">
                        <img src={ellipsis3}  alt="Ellipsis"/>
                    </section>
                    <section className="ml-4">
                    <h3 className="text-xl">GADS Program 2022</h3>
                    <section className="flex flex-row items-center justify-between">
                    <label className="mr-12 text-sm text-gray-one">50%</label>
                    <p className="rounded-md w-full"><p className="w-1/2 rounded-xl border-[6px] border-green-one"></p></p>
                    </section>
                    </section>
                </section>
                <span className="text-gray-one text-sm leading-1">Jun 13, 2022 -{'>'} Feb 10, 2023</span>
                </section>
                </section>) })}
                </section>
            </section>
            <section className="flex flex-col bg-lighterGreen-three rounded-lg p-4 mb-8">
            <section className="flex flex-row items-center justify-between px-8">
                <h3 className="text-lg font-semibold">Reports Overview</h3>
                <button className="px-8 py-2 text-base bg-white">10 Reports Summitted</button>
                </section>
                <section className="inline-flex">
                    {[1,2,3].map((item, i) => {

            return(
                <section className="flex flex-row p-8">
                <section className="flex flex-col p-4 pr-[86.67px] bg-lighterGreen-two rounded-lg">
                <section className="flex flex-row items-center mb-4">
                    <section className="mr-4">
                        <img src={note}  alt="Ellipsis" width="50"/>
                    </section>
                    <section className="ml-4">
                    <h3 className="text-xl">Google Africa Scholarship</h3>
                    <section className="flex flex-row items-center justify-between">
                    <p className="text-gray-one text-md leading-1"><span className="font-semibold">By Ibrahim Kabir -</span><span>19th-25th Oct 22</span></p>
                    </section>
                    </section>
                </section>
                </section>
                </section>)})}
                </section>

            </section>
            <section className="flex flex-col bg-lighterGreen-three rounded-lg p-4 mb-8">
                <section>
                                    <h3 className="text-lg font-bold">Tasks Overview</h3>
                                    </section>

                <section className="flex flex-row p-8">
                    <section className="bg-green-three rounded-lg p-4 flex justify-center items-center mr-8">
                        <h3 className="text-white text-lg">In Progress</h3>
                    </section>

                    {
                        [1,2,3].map((item, i) => {
                            return (<>
                                      <section className="flex flex-col p-4 pr-[86.67px] bg-lighterGreen-two mr-8">
                <section className="flex flex-row items-center mb-4">
                    <section className="mr-4">
                        <img src={direction}  alt="Ellipsis"/>
                    </section>
                    <section className="ml-4">
                    <h3 className="text-xl">Room library article write ...</h3>
                    <section className="flex flex-row items-center justify-between">
                    <img src={calendar}  alt="Calendar" className="mr-4"/>
                    <span className="rounded-md w-full text-lighterGray-four">3 days from now</span>
                    </section>
                    </section>
                </section>

                </section>
                            
                            </>)
                        })
                    }
      
                </section>

                <section className="flex flex-row p-8">
                    <section className="bg-green-three rounded-xl p-4 flex justify-center items-center mr-8">
                        <h3 className="text-white text-lg">Completed</h3>
                    </section>

                    {
                        [1,2,3].map((item, i) => {
                            return (<>
                                      <section className="flex flex-col rounded-xl p-4 pr-[86.67px] bg-lighterGreen-two mr-8">
                <section className="flex flex-row items-center mb-4">
                    <section className="mr-4">
                        <img src={direction}  alt="Ellipsis"/>
                    </section>
                    <section className="ml-4">
                    <h3 className="text-xl">Room library article write ...</h3>
                    <section className="flex flex-row items-center justify-between">
                    <img src={calendar}  alt="Calendar" className="mr-4"/>
                    <span className="rounded-md w-full text-lighterGray-four">3 days from now</span>
                    </section>
                    </section>
                </section>

                </section>
                            
                            </>)
                        })
                    }
      
                </section>


            </section>
        </section>
    )
}

export default AdminDashboard;