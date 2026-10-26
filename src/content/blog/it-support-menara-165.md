<!--
meta
{
	"title": "Field Report: IT Support & Multi-Floor Network Monitoring at Menara 165",
	"excerpt": "An engineering field study covering enterprise multi-floor network monitoring with Zabbix and UniFi, hardware diagnostics, MikroTik routing, and infrastructure maintenance at Menara 165 (ESQ Group).",
	"date": "2026-06-01",
	"category": "internship",
	"readTime": "7 min read",
	"tags": ["IT Support", "Zabbix", "UniFi", "MikroTik", "Hardware", "Internship"]
}
-->
# Field Report: IT Support & Multi-Floor Network Monitoring at Menara 165

This technical field report documents my three-month internship experience (July 1 – September 26, 2025) within the IT & Operations Division of **ESQ 165 Leadership Center**, situated on the **24th Floor of Menara 165, South Jakarta**.

The core focus of this role was maintaining high availability across high-rise corporate network infrastructure, delivering rapid technical response to end-user issues, and executing proactive hardware and peripheral maintenance.

---

<a id="executive-summary"></a>
## 1. Executive Summary & Operational Scope

Menara 165 is a high-rise office tower with demanding connectivity requirements and heavy staff mobility. Corporate operations rely heavily on seamless IT integrity—spanning executive video conferences, sales & marketing workflows, and building operations.

Key operational responsibilities included:
- **Centralized Network Monitoring**: Real-time health monitoring of enterprise hosts, managed switches, and physical servers across multiple building floors.
- **Physical & Wireless Infrastructure**: Deploying and maintaining Ubiquiti UniFi Access Points, managing MikroTik core routers, and terminating Cat5e/Cat6 structured cabling.
- **Client Device Diagnostics & Tuning**: Troubleshooting system stuttering, memory allocation bottlenecks, component upgrades, and thermal repasting for staff laptops and workstations.
- **Peripheral Recovery & System Utility**: Resolving critical printer downtime (*waste ink pad counter lockouts*) and deploying standardized scanning utilities.

---

<a id="zabbix-network-monitoring"></a>
## 2. Multi-Floor Network Monitoring with Zabbix

To maintain high uptime and resolve network degradation before end-users experienced disruptions (*proactive monitoring*), the IT team leveraged the **Zabbix Enterprise Network Monitoring Server**.

### Zabbix Operational Workflow:
1. **Authentication & Central Dashboard**: Logging into the internal Zabbix monitoring server with elevated administrator privileges.
2. **Hosts Inventory Navigation**: Accessing the *Hosts* view to inspect servers, switches, and access gateways distributed across Menara 165 floors.
3. **Incident Detection & Latency Analysis**:
   - Tracking real-time status indicators (green for *healthy/up*, red for *down/unreachable*).
   - Analyzing live traffic throughput graphs and server resource utilization metrics.
   - Pinpointing sudden packet loss anomalies to prevent dropped video conferences or corrupted internal file transfers.

---

<a id="unifi-mikrotik-management"></a>
## 3. UniFi Wireless Management & MikroTik Routing

High-density wireless connectivity was managed centrally using the **Ubiquiti UniFi Controller**, while boundary routing and gateway bandwidth allocation were configured via **MikroTik WinBox**.

### Architecture & Practical Implementation:
- **Ubiquiti UniFi Network Controller**:
  - Monitoring wireless client distribution across floor access points to prevent channel saturation on a single AP.
  - Analyzing RSSI signal strengths and re-provisioning access points experiencing interference or intermittent disconnects.
- **MikroTik WinBox (GUI)**:
  - Inspecting interface traffic, active DHCP leases, firewall filter counters, and router CPU load.
  - Verifying balanced bandwidth allocation to ensure voice and video traffic remained priority-routed without gateway bottlenecks.

---

<a id="hardware-maintenance-diagnostics"></a>
## 4. PC & Laptop Hardware Maintenance & Diagnostics

Complementing my background in *device optimization*, systematic preventative maintenance was performed regularly to prolong equipment lifespan and keep employee workstations responsive.

### Standard Diagnostic Procedures:
1. **Initial Fault Isolation**: Identifying symptoms such as system lag, extended boot times, excessive thermal output, or power-on self-test (*POST*) failures.
2. **Physical Overhaul & Dust Mitigation**:
   - Opening desktop and laptop chassis following anti-static handling guidelines.
   - Clearing accumulated dust from heatsink fins and fan blades to resolve severe thermal throttling.
   - Cleaning dried compounds and applying fresh high-performance thermal paste onto CPU and integrated GPU dies.
3. **Memory & Storage Integrity Testing**:
   - Reseating and testing RAM modules across motherboard DIMM slots to verify stable dual-channel operation.
   - Inspecting drive S.M.A.R.T attributes to catch early signs of storage degradation and prevent unrecoverable data loss.
4. **Operating System Provisioning & Tuning**:
   - Performing clean Windows installations for new workstation setups and shared public terminals.
   - Configuring drive partitioning schemes, disabling unnecessary background telemetry and startup services, and optimizing memory paging allocations.

---

<a id="utp-cabling-infrastructure"></a>
## 5. UTP Structured Cabling & Termination (Physical Layer)

Office reconfigurations and the addition of new cubicles required running new physical Ethernet links to ensure low-latency, shielded connectivity directly from patch panels.

### Standards & Quality Assurance:
- **Cable Preparation & Pinout**: Stripping Cat-grade UTP cable jackets and aligning conductors strictly according to the **T568B** standard (White-Orange, Orange, White-Green, Blue, White-Blue, Green, White-Brown, Brown).
- **RJ45 Termination**: Precision crimping to ensure copper teeth fully penetrated conductor insulation without pinching outer jackets unevenly.
- **Continuous Continuity Verification**: Running each completed link through an electronic **LAN Cable Tester** to verify that pins 1 through 8 fired sequentially without open circuits, split pairs, or shorted pins.

---

<a id="epson-printer-recovery"></a>
## 6. Epson Printer Reset & Recovery Procedures

A recurring blocker in office administrative tasks was the *Service Required* lockdown on department Epson ink-tank printers once internal software reached maximum *Waste Ink Pad Counter* thresholds.

### Recovery Workflow:
1. Connecting the locked unit directly to the technician laptop via dedicated USB interface.
2. Launching the specific **EPSON Adjustment Program (Resetter Utility)** matching the target printer model.
3. Entering **Particular Adjustment Mode** and selecting the **Waste Ink Pad Counter** inspection menu.
4. Executing counter readout to quantify ink absorption percentages.
5. Triggering the **Initialize** routine to clear internal counter registers back to 0%.
6. Power-cycling the hardware and executing test print / document scan cycles via **Epson Scan Utility** to confirm complete recovery before redeployment.

---

<a id="key-takeaways-impact"></a>
## 7. Key Takeaways & Field Impact

Three months of real-world IT operations in Menara 165 demonstrated that enterprise productivity relies fundamentally on robust, quietly maintained infrastructure.

### Core Lessons Learned:
- **Proactive vs. Reactive Operations**: Automated monitoring platforms like Zabbix and UniFi save countless hours compared to waiting for user failure tickets.
- **Standardized Maintenance**: Adhering to strict hardware diagnostic protocols significantly extends machine longevity and reduces hardware downtime.
- **Technical Communication**: Translating technical issues into clear, reassuring explanations for non-technical colleagues is a vital capability for any modern IT Engineer.
