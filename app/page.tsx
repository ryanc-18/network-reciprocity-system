'use client';

import { useState } from 'react';
import { MOCK_CLINICS, MOCK_REQUESTS } from '../lib/mockData';
import { ClinicData, ViewType, SharingRequest } from '../types';

export default function HomePage() {
  const [currentView, setCurrentView] = useState<ViewType>('dashboard');

  const [clinicData, setClinicData] = useState<ClinicData>({ name: 'My Clinic', optedIn: false, patientsShared: 0, accessCount: 0, multiplier: 0 });

  const [sharingRequest, setSharingRequest] = useState<SharingRequest | null>(null);

  const [fulfilledRequestIds, setFulfilledRequestIds] = useState<number[]>([]);

  // network participation starting at 19 for demonstration purposes
  const [networkParticipation, setNetworkParticipation] = useState<number>(19);

  const handleToggleLogIn = () => {
    setClinicData({
      ...clinicData,
      optedIn: !clinicData.optedIn,
    });
  };

  const handleConfirmShare = () => {
    // Logic to handle sharing the patient history
    const newPatientsShared = clinicData.patientsShared + 1;
    let newMultiplier = 1.5;
    if (newPatientsShared >= 50) {
      newMultiplier = 5.0;
    } else if (newPatientsShared >= 25) {
      newMultiplier = 3.5;
    } else if (newPatientsShared >= 10) {
      newMultiplier = 2.5;
    }

    const newAccessCount = Math.floor(newPatientsShared * newMultiplier);

    const newQualityProviderRating = Math.min(5, clinicData.qualityProviderRating + 0.2);


    setClinicData({
      ...clinicData,
      patientsShared: newPatientsShared,
      multiplier: newMultiplier,
      accessCount: newAccessCount,
      qualityProviderRating: newQualityProviderRating,
    });

    setFulfilledRequestIds([...fulfilledRequestIds, sharingRequest!.id]);
    setSharingRequest(null);
  };

  // const calculateMultiplier = (patientsShared: number) => {
  //   let newMultiplier = 1.5;
  //   if (patientsShared >= 10) {
  //     newMultiplier = 2.5;
  //   } else if (patientsShared >= 25) {
  //     newMultiplier = 3.5;
  //   } else if (patientsShared >= 50) {
  //     newMultiplier = 5.0;
  //   }
  //   return newMultiplier;
  // };

  return (
    <div className='bg-white min-h-screen'>
      <nav className='flex border-b border-gray-200 shadow-sm'>
        <div className='max-w-7xl mx-auto px-8 py-4'> 
          <div className='flex justify-between items-center'>
            <h1 className='text-2xl font-bold text-black mx-10'>Kinetic Network Prototype</h1>
          
            <div className='flex gap-2'>
              <button onClick={() => setCurrentView('dashboard')}
                className={`px-4 py-2 rounded-md font-medium ${
                    currentView === 'dashboard'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}>Dashboard</button>
              <button onClick={() => setCurrentView('requests')}
                className={`px-4 py-2 rounded-md font-medium ${
                    currentView === 'requests'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}>Patient Requests</button>
              <button onClick={() => setCurrentView('simulator')}
                className={`px-4 py-2 rounded-md font-medium ${
                    currentView === 'simulator'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}>Network Simulator</button>
              <button onClick={() => setCurrentView('walkthrough')}
                className={`px-4 py-2 rounded-md font-medium ${
                    currentView === 'walkthrough'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}>Walkthrough</button>
            </div>
          </div>
        </div>
      </nav>

      <main className='max-w-7xl mx-auto px-8 py-4'>
        {currentView === 'dashboard' && <div>
          <div>
            <h2 className='text-xl font-bold text-gray-500'>Clinic Dashboard</h2>
            <div className='bg-white rounded-lg border border-gray-200 p-6 shadow-sm'>
              <h3 className='text-xl font-semibold mb-4 text-gray-500'>{clinicData.name}</h3>

              {/* opt in */}
              <div className='mb-6'>
                <label className='flex items-center gap-3 cursor-pointer'>
                  <input
                    type='checkbox'
                    checked={clinicData.optedIn}
                    onChange={handleToggleLogIn}
                    className='w-5 h-5'
                  />
                  <span className='text-lg font-medium text-gray-300'>{clinicData.optedIn ? 'Opted in' : 'Opt in to share patient data'}</span>
                </label>
              </div>

              {/* stats */}
              <div className="space-y-3">
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-600">Patients Shared:</span>
                  <span className="font-semibold text-gray-500">{clinicData.patientsShared}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-600">Histories Accessible:</span>
                  <span className="font-semibold text-blue-600">
                    {clinicData.accessCount}
                  </span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-600">Current Multiplier:</span>
                  <span className="font-semibold text-gray-500">{clinicData.multiplier}x</span>
                </div>
              </div>

              {!clinicData.optedIn && (
                <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-md">
                  <p className='text-yellow-800 text-sm'>You're missing out on valuable patient histories by not participating</p>
              </div>
              )}



              
            </div>
          </div>
        </div>}
        {/* placeholder for other views */}
        {currentView === 'requests' && (
        <div>
          <h2 className='text-xl font-bold text-gray-500'>Patient History Requests</h2>

          {!clinicData.optedIn ? (
            <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-md">
              <p className='text-yellow-800 text-sm'>You must opt in to share patient data to view and manage requests.</p>
                <button onClick={() => setCurrentView('dashboard')} className='mt-2 px-4 py-2 bg-blue-600 text-white rounded-md'>Go to Dashboard</button>
             </div>
          ) : (
            <div className='space-y-4'>
              {/* show message if no patients shared yet */}
              {clinicData.patientsShared === 0 && (
                <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-md">
                  <p className='text-blue-800 text-sm'>No patient history requests available. Share patient data to start receiving requests.</p>
                </div>
              )}

              {/* request cards */}
              {MOCK_REQUESTS.filter(request => !fulfilledRequestIds.includes(request.id)).map(request => (
                <div key={request.id} className='bg-white border border-gray-200 rounded-lg p-4 shadow-sm'>
                  {/* request header */}
                  <div className='flex justify-between items-center mb-4'>
                    <div>
                      <h3 className='text-xl font-semibold text-gray-900'>{request.patientName}</h3>
                      <p className='text-gray-600 text-sm'>{request.patientCondition}</p>
                    </div>
                    <span className='text-xs text-gray-500'>{request.requestDate}</span>
                  </div>

                  {/* request clinics */}
                  <div className='mb-4'>
                    <p className='text-sm text-gray-600'>
                      <span className='font-semibold'>Requesting Clinic:</span> {request.requestingClinic}
                    </p>
                  </div>

                  {/* reason */}
                  <div className='mb-4'>
                    <p className='text-sm text-gray-600'>
                      <span className='font-semibold'>Reason:</span> {request.reason}
                    </p>
                  </div>

                  {/* ation buttons */}
                  <div className='flex gap-3'>
                    <button onClick={() => setSharingRequest(request)} className='px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 font-medium'>
                      Share History
                    </button>
                    <button className='px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 font-medium'>Ignore Request</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        )}



        {currentView === 'simulator' && 
          <div>
            <h2 className='text-3xl font-bold text-gray-500 mb-6'>Network Simulator</h2>
            <p className='text-gray-600 mb-8'>See how network growth affects the value of participation</p>
            
            <div className='bg-white rounded-lg border border-gray-200 p-6 shadow-sm mb-6'>
              <h3 className='text-xl font-semibold text-gray-900 mb-4'>Network Participation</h3>

              {/* network participation slider */}
              <div className='mb-8'>
                <input type="range" min="0" max="100" value={networkParticipation} onChange={(e) => setNetworkParticipation(Number(e.target.value))} className='w-full h-2 bg-gray-200 appearance-none cursor-pointer'/>

                <div className='text-center mt-4'>
                  <div className='text-5xl font-bold text-gray-900'>{networkParticipation}%</div>
                  <div className='text-sm text-gray-500'>of clinics participating in the network</div>
                </div>
              </div>

              {/* milestone markers */}
              <div className='flex justify-between mb-8'>
                <div className={`absolute text-center transition-opacity ${networkParticipation >= 19 ? 'opacity-100' : 'opacity-30'}`} style={{ left: '19%', transform: 'translateX(-50%)' }}>
                  <div className='text-2xl font-bold text-blue-600'>19%</div>
                  <div className='text-gray-600 whitespace-nowrap'>Current State</div>
                </div>
                <div className={`absolute text-center transition-opacity ${networkParticipation >= 50 ? 'opacity-100' : 'opacity-30'}`} style={{ left: '50%', transform: 'translateX(-50%)' }}>
                  <div className='text-2xl font-bold text-blue-600'>50%</div>
                  <div className='text-gray-600'>Milestone Reached</div>
                </div>
                <div className={`absolute text-center transition-opacity ${networkParticipation >= 80 ? 'opacity-100' : 'opacity-30'}`} style={{ left: '80%', transform: 'translateX(-50%)' }}>
                  <div className='text-2xl font-bold text-blue-600'>80%</div>
                  <div className='text-gray-600'>Target</div>
                </div>                      
              </div>

              {/* network pool */}
              <div className='bg-blue-50 border border-blue-200 rounded-lg p-4 mt-20'>
                <h4 className='font-semibold text-gray-900'>Network Pool Size at {networkParticipation}%</h4>
                <div className='text-4xl font-bold text-blue-600 mb-4'>{Math.floor(networkParticipation * 60).toLocaleString()} histories</div>
                <p className='text-sm text-gray-500'>Total patient histories available in the network from participating clinics.</p>
              </div>
            </div>

            {/* your clinic stats */}
            <div className='bg-white rounded-lg border border-gray-200 p-6 shadow-sm mb-6'>
              <h3 className='text-xl font-semibold text-gray-900 mb-4'>Your Clinic's Position</h3>

              <div className='grid grid-cols-3 gap-4 mb-6'>
                <div className='p-4 bg-gray-50 rounded-lg text-center'>
                  <div className='text-2xl font-bold text-gray-900'>
                    {clinicData.patientsShared}
                  </div>
                  <div className='text-sm text-gray-600 mt-1'>Patients Shared</div>
                </div>
                <div className='p-4 bg-blue-50 rounded-lg text-center'>
                  <div className='text-2xl font-bold text-gray-600'>
                    {clinicData.multiplier}x
                  </div>
                  <div className='text-sm text-gray-500 mt-1'>Your Multiplier</div>
                </div>
                <div className='p-4 bg-green-50 rounded-lg text-center'>
                  <div className='text-2xl font-bold text-green-600'>
                    {clinicData.accessCount}
                  </div>
                  <div className='text-sm text-gray-600 mt-1'>Histories You Can Access</div>
                </div>
              </div>

              {clinicData.patientsShared === 0 ? (
                <div className='p-4 bg-yellow-50 border border-yellow-200 rounded-lg'>
                  <p className='text-yellow-800 text-sm'>
                    💡 Start sharing patient histories to see how network growth affects your access
                  </p>
                </div>
              ) : (
                <div className='p-4 bg-blue-50 border border-blue-200 rounded-lg'>
                  <p className='text-blue-900 text-sm font-semibold mb-2'>
                    Key Insight: Your multiplier ({clinicData.multiplier}x) stays the same, but the VALUE increases as the network grows
                  </p>
                  <p className='text-blue-800 text-sm'>
                    With {clinicData.accessCount} access points, you can now choose from{' '}
                    <strong>{Math.floor(networkParticipation * 60).toLocaleString()}</strong> histories instead of just{' '}
                    <strong>{Math.floor(19 * 60).toLocaleString()}</strong>
                  </p>
                </div>
              )}
            </div>

            {/* FOMO Effect Comparison */}
            <div className='bg-white rounded-lg border border-gray-200 p-6 shadow-sm mb-6'>
              <h3 className='text-xl font-semibold mb-4 text-gray-500'>Participation vs. Non-Participation</h3>

              <div className='grid grid-cols-2 gap-4'>
                {/* opted in */}
                <div className='p-4 bg-green-50 border-2 border-green-500 rounded-lg'>
                  <div className='flex items-center gap-2 mb-3'>
                    <span className='text-2xl text-green-700'>✓</span>
                    <h4 className='font-semibold text-green-900'>{`You (Opted In)`}</h4>
                  </div>
                  <div className='space-y-2 text-sm'>
                    <div className='flex justify-between'>
                      <span className='text-gray-600'>Access to Pool:</span>
                      <span className='font-semibold text-green-700'>{Math.floor(networkParticipation * 60).toLocaleString()} histories</span>
                    </div>
                    <div className='flex justify-between'>
                      <span className='text-gray-600'>Your Multiplier:</span>
                      <span className='font-semibold text-green-700'>{clinicData.multiplier || 1.5}x</span>
                    </div>
                    <div className='flex justify-between'>
                      <span className='text-gray-600'>Can Access:</span>
                      <span className='font-semibold text-green-700'>{clinicData.accessCount || 'Share to Unlock'}</span>
                    </div>
                  </div>
                </div>  

                {/* opted out */}
                <div className='p-4 bg-red-50 border-2 border-red-500 rounded-lg'>
                  <div className='flex items-center gap-2 mb-3'>
                    <span className='text-2xl text-red-700'>✗</span>
                    <h4 className='font-semibold text-red-900'>Non-Participant</h4>
                  </div>
                  <div className='space-y-2 text-sm'>
                    <div className='flex justify-between'>
                      <span className='text-gray-700'>Access to pool:</span>
                      <span className='font-semibold text-red-700'>0 histories</span>
                    </div>
                    <div className='flex justify-between'>
                      <span className='text-gray-700'>Their multiplier:</span>
                      <span className='font-semibold text-red-700'>0x</span>
                    </div>
                    <div className='flex justify-between'>
                      <span className='text-gray-700'>Missing out on:</span>
                      <span className='font-semibold text-red-700'>
                        {Math.floor(networkParticipation * 60).toLocaleString()} histories
                      </span>
                    </div>
                  </div>
                </div>

              </div>

              <div className='mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg'>
                <p className='text-sm text-yellow-900'>
                  <strong>FOMO Effect:</strong> At {networkParticipation}% participation, non-participating clinics are completely blind to{' '}
                  <strong>{Math.floor(networkParticipation * 60).toLocaleString()}</strong> patient histories while their competitors have full visibility.
                </p>
              </div>
            </div>


            {/* Why Network Growth Drives Adoption */}
            <div className='bg-white rounded-lg border border-gray-200 p-6 shadow-sm'>
              <h3 className='text-xl font-semibold mb-4 text-gray-900'>Why Network Growth Drives 19% → 80% Adoption</h3>
              
              <div className='space-y-4'>
                <div className='flex gap-4 p-4 bg-gray-50 rounded-lg'>
                  <span className='text-3xl'>🎯</span>
                  <div>
                    <h4 className='font-semibold mb-1 text-gray-900'>Bigger Pool = More Value</h4>
                    <p className='text-sm text-gray-600'>
                      At 19%: ~1,140 histories available. At 80%: ~4,800 histories available. 
                      Your access points are worth more in a larger, higher-quality pool.
                    </p>
                  </div>
                </div>

                <div className='flex gap-4 p-4 bg-gray-50 rounded-lg'>
                  <span className='text-3xl'>😱</span>
                  <div>
                    <h4 className='font-semibold mb-1 text-gray-900'>FOMO Pressure Intensifies</h4>
                    <p className='text-sm text-gray-600'>
                      As more clinics join, non-participants fall further behind. At {networkParticipation}% participation, 
                      they're missing {Math.floor(networkParticipation * 60).toLocaleString()} histories their competitors have access to.
                    </p>
                  </div>
                </div>

                <div className='flex gap-4 p-4 bg-gray-50 rounded-lg'>
                  <span className='text-3xl'>🔒</span>
                  <div>
                    <h4 className='font-semibold mb-1 text-gray-900'>Can't Compete Without It</h4>
                    <p className='text-sm text-gray-600'>
                      Once 60%+ of clinics participate, staying out means you can't provide the same quality of care. 
                      You're treating patients blind while competitors have full history.
                    </p>
                  </div>
                </div>

                <div className='flex gap-4 p-4 bg-gray-50 rounded-lg'>
                  <span className='text-3xl'>⚖️</span>
                  <div>
                    <h4 className='font-semibold mb-1 text-gray-900'>Still Selfish & Rational</h4>
                    <p className='text-sm text-gray-600'>
                      Your decision to join is purely self-interested: you ALWAYS get more than you give (via your personal multiplier), 
                      and the network pool just makes that exchange more valuable.
                    </p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        }
      {currentView === 'walkthrough' && (
        <div>
          <h2 className='text-xl font-bold text-gray-500 mb-4'>Prototype Walkthrough</h2>
        </div>

      )}
      </main>




      {/* modal backdrop for sharing request page */}
      {sharingRequest && (
        // modal backdrop
        <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center'>
          {/* modal */}
          <div className='bg-white rounded-lg p-6 max-w-sm mx-auto'>
            {/* modal header */}
            <h3 className='text-lg font-semibold text-gray-500 mb-4'>Share Patient History</h3>
            <p className='mb-4 text-gray-500'>Are you sure you want to share the history for {sharingRequest.patientName}?</p>
            {/* patient info */}
            <div className='flex justify-end'>
              <p className='text-gray-500'>Sharing <strong>{sharingRequest.patientName}</strong>'s history with <strong>{sharingRequest.requestingClinic}</strong></p>
            </div>

            {/* what gets shared */}
            <div className='mb-6'>
              <h4 className='font-semibold text-gray-500'>What Will be Shared:</h4>
              <div className='grid grid-cols-2 gap-4'>
                {/* Shared Info */}
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                  <h5 className="font-semibold text-green-900 mb-2">✓ Shared</h5>
                  <ul className="text-sm text-green-800 space-y-1">
                    <li>• Diagnosis history</li>
                    <li>• Treatment protocols</li>
                    <li>• Objective measurements</li>
                    <li>• Imaging results</li>
                    <li>• Exercise programs</li>
                    <li>• Treatment outcomes</li>
                  </ul>
                </div>

                {/* private info */}
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                  <h5 className="font-semibold text-red-900 mb-2">✗ Kept Private</h5>
                  <ul className="text-sm text-red-800 space-y-1">
                    <li>• Clinical notes</li>
                    <li>• Personal observations</li>
                    <li>• Billing information</li>
                    <li>• Insurance details</li>
                    <li>• Contact information</li>
                  </ul>
                </div>



              </div>
            </div>

            {/* primary provider benefits */}
            <div className='mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg'>
              <h4 className='font-semibold text-blue-900 text-lg mb-2'>Primary Provider Benefits:</h4>
              <p className='text-sm text-blue-900 mb-3'>You will be tagged as the Primary Provider for {sharingRequest.patientName}</p>
              <ul className='text-sm text-blue-900 mb-3'>
                <li>• Notified if patient returns</li>
                <li>• +12 points if patient returns within 12 months</li>
                <li>• Builds your reputation as a <strong>"quality provider"</strong></li>
                <li>• If they return back, your <strong>"good partners"</strong> rating will increase</li>
              </ul>
            </div>


            {/* action buttons */}
            <div className='flex gap-3 justify-end'>
              <button
                onClick={() => setSharingRequest(null)}
                className='px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 font-medium'
              >
                Cancel
              </button>
              <button onClick={() => {
                handleConfirmShare();
              }}
              className='px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 font-medium'
              >
                Confirm Share
              </button>
            </div>


          </div>
        </div>
      )}
    </div>
  )}
