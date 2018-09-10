#version 450

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

layout(location = 0) in vec3 vsin_Position;
layout(location = 1) in vec2 TextureCoords;
layout(location = 2) in vec2 LightmapCoords;
layout(location = 3) in ivec4 StyleIndices;

layout(location = 0) out vec3 fsin_0;
layout(location = 1) out vec2 fsin_TexCoord;
layout(location = 2) out vec2 fsin_LightmapCoord;
layout(location = 3) out flat ivec4 fsin_StyleIndices;

layout(constant_id = 102) const bool ReverseDepthRange = true;

void main()
{
    gl_Position = _Proj * _View * _WorldAndInverse.World * vec4(vsin_Position, 1.0f);
    fsin_0 = vsin_Position;
	fsin_TexCoord = TextureCoords;
	fsin_LightmapCoord = LightmapCoords;
	fsin_StyleIndices = StyleIndices;
}
