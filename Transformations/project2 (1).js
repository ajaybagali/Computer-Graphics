	// Returns a 3x3 transformation matrix as an array of 9 values in column-major order.
// The transformation first applies scale, then rotation, and finally translation.
// The given rotation value is in degrees.
function GetTransform( positionX, positionY, rotation, scale )
{
	//translation matrix
	const translation_matrix = [1, 0, 0, 0, 1, 0, positionX, positionY, 1 ];
	const rotation_radian = rotation * (Math.PI/180);
	const rotation_matrix = [Math.cos(rotation_radian), Math.sin(rotation_radian),0, -(Math.sin(rotation_radian)), Math.cos(rotation_radian),0,0,0,1];
	const scale_matrix = [scale, 0, 0, 0, scale, 0, 0, 0, 1];
	const mid_matrix = ApplyTransform(rotation_matrix,translation_matrix);

	return ApplyTransform(scale_matrix,mid_matrix);
}

// Returns a 3x3 transformation matrix as an array of 9 values in column-major order.
// The arguments are transformation matrices in the same format.
// The returned transformation first applies trans1 and then trans2.
function ApplyTransform( trans1, trans2 )
{
	//column 1
	 const r1c1 = (trans2[0]*trans1[0]) + (trans2[3]*trans1[1]) + (trans2[6]*trans1[2]);
	 const r2c1 = (trans2[1]*trans1[0]) + (trans2[4]*trans1[1]) + (trans2[7]*trans1[2]);
	 const r3c1 = (trans2[2]*trans1[0]) + (trans2[5]*trans1[1]) + (trans2[8]*trans1[2]);

	 //column2
	 const r1c2 = (trans2[0]*trans1[3]) + (trans2[3]*trans1[4]) + (trans2[6]*trans1[5]);
	 const r2c2 = (trans2[1]*trans1[3]) + (trans2[4]*trans1[4]) + (trans2[7]*trans1[5]);
	 const r3c2 = (trans2[2]*trans1[3]) + (trans2[5]*trans1[4]) + (trans2[8]*trans1[5]);

	 //column3
	 const r1c3 = (trans2[0]*trans1[6]) + (trans2[3]*trans1[7]) + (trans2[6]*trans1[8]);
	 const r2c3 = (trans2[1]*trans1[6]) + (trans2[4]*trans1[7]) + (trans2[7]*trans1[8]);
	 const r3c3 = (trans2[2]*trans1[6]) + (trans2[5]*trans1[7]) + (trans2[8]*trans1[8]);

	return Array( r1c1, r2c1, r3c1, r1c2, r2c2, r3c2, r1c3, r2c3, r3c3 );
}
