#version 450

struct WorldAndInverseMatrices
{
    mat4 World;
    mat4 InverseWorld;
};

struct RenderArgumentsStruct
{
	int RenderMode;
	vec4 RenderColor;
};

const int RenderNormal = 0;
const int RenderTransColor = 1;
const int RenderTransTexture = 2;
const int RenderGlow = 3;
const int RenderTransAlpha = 4;
const int RenderTransAdd = 5;

layout(set = 0, binding = 0) uniform Projection
{
    mat4 _Proj;
};

layout(set = 0, binding = 1) uniform View
{
    mat4 _View;
};

layout(set = 0, binding = 2) uniform WorldAndInverse
{
    WorldAndInverseMatrices _WorldAndInverse;
};

layout(set = 0, binding = 3) uniform RenderArguments
{
	RenderArgumentsStruct _RenderArguments;
};

layout(location = 0) in vec3 vsin_Position;
layout(location = 1) in vec2 TextureCoords;

layout(location = 0) out vec3 fsin_0;
layout(location = 1) out vec2 fsin_TexCoord;
layout(location = 2) flat out int fsin_RenderMode;
layout(location = 3) flat out vec4 fsin_RenderColor;

layout(constant_id = 102) const bool ReverseDepthRange = true;

void main()
{
    gl_Position = _Proj * _View * _WorldAndInverse.World * vec4(vsin_Position, 1.0f);
    fsin_0 = vsin_Position;
	fsin_TexCoord = TextureCoords;
	fsin_RenderMode = _RenderArguments.RenderMode;
	fsin_RenderColor = _RenderArguments.RenderColor;
}
