const chapter = (id, name, weight) => ({ id, name, weight, theory: 'Not Started', module: 0, cengage: 0, pyq: 'None', revision: 0, score: '', final: false })

export const defaultSyllabus = {
  Physics: [
    chapter('p1', 'Rotational Mechanics', 'High'), chapter('p2', 'Electrostatics & Capacitance', 'High'),
    chapter('p3', 'Current Electricity', 'High'), chapter('p4', 'Modern Physics & Semiconductors', 'High'),
    chapter('p5', 'Laws of Motion & Kinematics', 'Medium'), chapter('p6', 'Thermodynamics & KTC', 'Medium'), chapter('p7', 'Ray & Wave Optics', 'Medium'),
  ],
  Chemistry: [
    chapter('c1', 'General Organic Chemistry (GOC)', 'High'), chapter('c2', 'Coordination Compounds', 'High'),
    chapter('c3', 'Chemical & Ionic Equilibrium', 'High'), chapter('c4', 'Thermodynamics & Thermochemistry', 'High'),
    chapter('c5', 'Hydrocarbons & Alkyl Halides', 'Medium'), chapter('c6', 'Periodic Table & Chemical Bonding', 'Medium'), chapter('c7', 'Atomic Structure', 'Low'),
  ],
  Mathematics: [
    chapter('m1', 'Definite Integration & Area', 'High'), chapter('m2', 'Matrices & Determinants', 'High'),
    chapter('m3', 'Vectors & 3D Geometry', 'High'), chapter('m4', 'Probability & Statistics', 'High'),
    chapter('m5', 'Limits, Continuity & Differentiability', 'Medium'), chapter('m6', 'Complex Numbers & Quadratic', 'Medium'), chapter('m7', 'Coordinate Geometry (Conic Sections)', 'Medium'),
  ],
}

export const freshSyllabus = () => JSON.parse(JSON.stringify(defaultSyllabus))
