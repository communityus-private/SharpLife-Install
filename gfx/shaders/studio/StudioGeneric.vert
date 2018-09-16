#version 450

const int MaxBones = 128;

struct WorldAndInverseMatrices
{
    mat4 World;
    mat4 InverseWorld;
};

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

layout(set = 0, binding = 3) uniform Bones
{
	mat4 _Bones[MaxBones];
};

layout(location = 0) in vec3 vsin_Position;
layout(location = 1) in vec2 TextureCoords;
layout(location = 2) in uint BoneIndex;

layout(location = 0) out vec2 fsin_TextureCoords;

void main()
{
    gl_Position = _Proj * _View * _WorldAndInverse.World * vec4((_Bones[BoneIndex] * vec4(vsin_Position, 1.0f)).xyz, 1.0);
	fsin_TextureCoords = TextureCoords;
}
