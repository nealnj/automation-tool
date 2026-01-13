
import React from 'react';
// Fix: Added missing Activity import
import { Laptop, Wifi, Usb, Cpu, Smartphone, CheckCircle2, XCircle, AlertCircle, Activity } from 'lucide-react';

const StatCard = ({ label, value, icon: Icon, color }: any) => (
  <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-sm">
    <div className="flex justify-between items-start mb-4">
      <div className={`p-3 rounded-xl bg-opacity-10 ${color.bg}`}>
        <Icon className={color.text} size={24} />
      </div>
      <span className="text-xs font-semibold px-2 py-1 rounded bg-slate-800 text-slate-400">Live</span>
    </div>
    <h3 className="text-slate-400 text-sm font-medium">{label}</h3>
    <p className="text-2xl font-bold text-white mt-1">{value}</p>
  </div>
);

const DeviceList = () => {
  const devices = [
    { name: 'Xiaomi 13 Ultra', type: 'Android', id: 'adb-4492a', status: 'Connected', connection: 'USB' },
    { name: 'IVU Car Head Unit', type: 'CarHeadUnit', id: 'wifi-192.168.1.5', status: 'Connected', connection: 'WiFi' },
    { name: 'iPhone 15 Pro', type: 'iOS', id: 'id-00008110', status: 'Connected', connection: 'USB' },
    { name: 'ST MCU Node', type: 'MCU', id: 'com4', status: 'Disconnected', connection: 'Serial' },
  ];

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden mt-8">
      <div className="px-6 py-4 border-b border-slate-800 flex justify-between items-center">
        <h2 className="font-bold text-lg">Connected Devices</h2>
        <button className="text-xs bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-md transition-colors">
          Scan Devices
        </button>
      </div>
      <table className="w-full text-left">
        <thead className="bg-slate-800/50 text-slate-400 text-xs uppercase">
          <tr>
            <th className="px-6 py-3">Device Name</th>
            <th className="px-6 py-3">Type</th>
            <th className="px-6 py-3">ID / IP</th>
            <th className="px-6 py-3">Connection</th>
            <th className="px-6 py-3">Status</th>
            <th className="px-6 py-3">Action</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-800">
          {devices.map((device, i) => (
            <tr key={i} className="hover:bg-slate-800/30 transition-colors">
              <td className="px-6 py-4 font-medium flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center">
                   {device.type === 'Android' || device.type === 'iOS' ? <Smartphone size={16}/> : <Laptop size={16}/>}
                </div>
                {device.name}
              </td>
              <td className="px-6 py-4 text-sm text-slate-400">{device.type}</td>
              <td className="px-6 py-4 text-sm mono text-slate-300">{device.id}</td>
              <td className="px-6 py-4">
                <span className="flex items-center gap-1.5 text-xs">
                  {device.connection === 'USB' ? <Usb size={14} className="text-blue-400" /> : <Wifi size={14} className="text-green-400" />}
                  {device.connection}
                </span>
              </td>
              <td className="px-6 py-4">
                <span className={`flex items-center gap-1.5 text-xs font-medium ${device.status === 'Connected' ? 'text-green-400' : 'text-slate-500'}`}>
                  {device.status === 'Connected' ? <CheckCircle2 size={14} /> : <XCircle size={14} />}
                  {device.status}
                </span>
              </td>
              <td className="px-6 py-4">
                <button className="text-blue-400 hover:text-blue-300 text-sm font-medium">Manage</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default function Dashboard() {
  return (
    <div className="max-w-7xl mx-auto">
      <header className="mb-8">
        <h1 className="text-3xl font-bold">System Dashboard</h1>
        <p className="text-slate-400">Manage your connected hardware and active test suites.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard label="Active Devices" value="3 / 4" icon={Smartphone} color={{ bg: 'bg-blue-600', text: 'text-blue-400' }} />
        <StatCard label="Scripts Executed" value="1,248" icon={Laptop} color={{ bg: 'bg-purple-600', text: 'text-purple-400' }} />
        <StatCard label="CAN Bus Load" value="42.1%" icon={Activity} color={{ bg: 'bg-green-600', text: 'text-green-400' }} />
        <StatCard label="Critical Errors" value="0" icon={AlertCircle} color={{ bg: 'bg-red-600', text: 'text-red-400' }} />
      </div>

      <DeviceList />
    </div>
  );
}
